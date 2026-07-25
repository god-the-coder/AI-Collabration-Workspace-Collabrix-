from django.test import TestCase

from apps.accounts.models import UserModel
from apps.notifications.models import Notification, NotificationType
from apps.workspaces.models import Invitation, InvitationStatus, Workspace, WorkspaceMember, WorkspaceRole
from api.v1.workspaces.services import InvitationService


class InvitationServiceTests(TestCase):
    def setUp(self):
        self.owner = UserModel.objects.create_user(
            username="owner",
            email="owner@example.com",
            password="password123",
        )
        self.invitee = UserModel.objects.create_user(
            username="invitee",
            email="invitee@example.com",
            password="password123",
        )
        self.workspace = Workspace.objects.create(
            owner=self.owner,
            name="Test Workspace",
            slug="test-workspace",
        )
        WorkspaceMember.objects.create(
            user=self.owner,
            workspace=self.workspace,
            role=WorkspaceRole.OWNER,
        )

    def test_invite_member_creates_workspace_invitation_notification_for_existing_user(self):
        InvitationService.invite_member(
            user=self.owner,
            workspace_id=self.workspace.id,
            validated_data={
                "email": self.invitee.email,
                "role": WorkspaceRole.MEMBER,
            },
        )

        invitation = Invitation.objects.get(workspace=self.workspace, email=self.invitee.email)
        notification = Notification.objects.filter(
            recipient=self.invitee,
            workspace=self.workspace,
            notification_type=NotificationType.WORKSPACE_INVITATION,
            target_id=invitation.id,
        ).first()

        self.assertIsNotNone(notification)
        self.assertEqual(notification.actor, self.owner)

    def test_accept_invitation_creates_notification_for_inviter(self):
        invitation = Invitation.objects.create(
            workspace=self.workspace,
            email=self.invitee.email,
            role=WorkspaceRole.MEMBER,
            invited_by=self.owner,
            expires_at="2099-01-01T00:00:00Z",
        )

        InvitationService.accept_invitation(user=self.invitee, token=invitation.token)

        notification = Notification.objects.filter(
            recipient=self.owner,
            workspace=self.workspace,
            notification_type=NotificationType.WORKSPACE_INVITATION,
            target_id=invitation.id,
        ).first()

        self.assertIsNotNone(notification)
        self.assertEqual(notification.actor, self.invitee)
