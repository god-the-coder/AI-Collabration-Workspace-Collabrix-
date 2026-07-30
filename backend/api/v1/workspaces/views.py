from rest_framework.views import APIView, Response
from .services import WorkspaceService, WorkspaceMembersService, InvitationService
from .serializers import  WorkspaceMemberSerializer, WorkspaceOverviewAndProjectsSerializer,WorkspaceLayoutSerializer,WorkspaceListSerializer, CreateWorkspaceSerializer, CreateWorkspaceResponseSerializer, InviteMemberSerializer, ChangeMemberRoleSerializer, MemberRoleResponseSerializer
# from apps.accounts.models import UserModel
from rest_framework import status



class WorskspacesListAPIView(APIView):

    def get(self, request):
       try: 
        result = WorkspaceService.get_workspaces_data(request.user)

        serializer = WorkspaceListSerializer(
            result["workspaces"],
            many=True
        )

        return Response ({
            "summary": result["summary"],
            "workspaces": serializer.data
        })
       except Exception as e:
          print(type(e))
          print(e)
          raise
 

class CreateWorkspaceAPIView(APIView):
   
   def post(self, request):
     try:
      
      
      serializer = CreateWorkspaceSerializer(
         data=request.data
        )
      serializer.is_valid(raise_exception=True)

      res = WorkspaceService.create_workspace(
         user=request.user,
         validated_data=serializer.validated_data
        )
      
      return Response(
         CreateWorkspaceResponseSerializer(res).data
      )
     except Exception as e:
       print(type(e))
       print(e)
       raise


class WorkspaceDetailAPIView(APIView):
  
  def get(self, request, workspace_id):
    try:
      resp = WorkspaceService.workspace_layout_summary(
        user=request.user, 
        workspace_id=workspace_id
      )

      serializer = WorkspaceLayoutSerializer(
         resp
      )

      return Response(serializer.data)
    except Exception as e:
      print(type(e))
      print(e)
      raise


class WorkspaceDetailOverviewAPIView(APIView):
  
  def get(self, request, workspace_id):
    try:
      resp=WorkspaceDetailSerivce.get_overview_data(
        user=request.user,
        workspace_id=workspace_id
      )

      return Response({
        "summary": resp["summary"],
        "active_projects": WorkspaceOverviewAndProjectsSerializer(resp["active_projects"], many=True).data
      })
    except Exception as e:
      print(type(e))
      print(e)
      raise
    

class WorkspaceDetailProjectsAPIView(APIView):

  def get(self, request, workspace_id):
    try:
      resp=WorkspaceDetailSerivce.get_projects_data(
        user=request.user,
        workspace_id=workspace_id
      )

      return Response({
        "summary": resp["summary"],
        "projects": WorkspaceOverviewAndProjectsSerializer(resp["projects"], many=True).data
      })
    except Exception as e:
      print(type(e))
      print(e)
      raise


class WorkspaceDetailMembersAPIView(APIView):
    def get(self, request, workspace_id):

        response = WorkspaceMembersService.get_members_data(
            request.user,
            workspace_id
        )

        return Response({
            "summary": response["summary"],
            "members": WorkspaceMemberSerializer(
                response["members"],
                many=True,
                context={
                  "request": request
                }
            ).data
        })



class InviteMemberAPIView(APIView):

    def post(self, request, workspace_id):
      try:
        serializer = InviteMemberSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        InvitationService.invite_member(
            user=request.user,
            workspace_id=workspace_id,
            validated_data=serializer.validated_data
        )

        return Response(
            {"message": "Invitation sent successfully."},
            status=status.HTTP_200_OK
        )
      except Exception as e:
        print(type(e))
        print(e)
        raise


class AcceptInvitationAPIView(APIView):

    def post(self, request, token):
      try:
        InvitationService.accept_invitation(
            user=request.user,
            token=token
        )

        return Response(
            {"message": "Invitation accepted successfully."},
            status=status.HTTP_200_OK
        )
      except Exception as e:
        print(type(e))
        print(e)
        raise


class RemoveMemberAPIView(APIView):

    def delete(self, request, workspace_id, user_id):
      try:
        InvitationService.remove_member(
            user=request.user,
            workspace_id=workspace_id,
            target_user_id=user_id
        )

        return Response(
            {"message": "Member removed successfully."},
            status=status.HTTP_200_OK
        )
      except Exception as e:
        print(type(e))
        print(e)
        raise


class ChangeMemberRoleAPIView(APIView):

    def patch(self, request, workspace_id, user_id):
      try:
        serializer = ChangeMemberRoleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        result = InvitationService.change_member_role(
            user=request.user,
            workspace_id=workspace_id,
            target_user_id=user_id,
            validated_data=serializer.validated_data
        )

        return Response(
            MemberRoleResponseSerializer(result).data
        )
      except Exception as e:
        print(type(e))
        print(e)
        raise

class InviteMemberAPIView(APIView):

    def post(self, request, workspace_id):
        try:
            serializer = InviteMemberSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            InvitationService.invite_member(
                user=request.user,
                workspace_id=workspace_id,
                validated_data=serializer.validated_data,
            )

            return Response(
                {"message": "Invitation sent successfully."},
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            print(type(e))
            print(e)
            raise


class AcceptInvitationAPIView(APIView):

    def post(self, request, token):
        try:
            InvitationService.accept_invitation(
                user=request.user,
                token=token,
            )

            return Response(
                {"message": "Invitation accepted successfully."},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            print(type(e))
            print(e)
            raise


class RemoveMemberAPIView(APIView):

    def delete(self, request, workspace_id, user_id):
        try:
            InvitationService.remove_member(
                user=request.user,
                workspace_id=workspace_id,
                target_user_id=user_id,
            )

            return Response(
                {"message": "Member removed successfully."},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            print(type(e))
            print(e)
            raise


class ChangeMemberRoleAPIView(APIView):

    def patch(self, request, workspace_id, user_id):
        try:
            serializer = ChangeMemberRoleSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            member = InvitationService.change_member_role(
                user=request.user,
                workspace_id=workspace_id,
                target_user_id=user_id,
                validated_data=serializer.validated_data,
            )

            return Response(
                MemberRoleResponseSerializer(member).data,
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            print(type(e))
            print(e)
            raise