from django.conf import settings
from django.db import migrations
import os


def move_uploads_forward(apps, schema_editor):
    File = apps.get_model('files', 'File')

    for f in File.objects.all():
        name = f.file.name
        if not name:
            continue

        # handle names like 'uploads/ws_image.jpg' -> 'ws_image.jpg'
        if name.startswith('uploads/'):
            new_name = name[len('uploads/'):]
            old_path = os.path.join(settings.MEDIA_ROOT, name)
            new_path = os.path.join(settings.MEDIA_ROOT, new_name)

            # ensure destination directory exists
            dest_dir = os.path.dirname(new_path)
            if dest_dir:
                os.makedirs(dest_dir, exist_ok=True)

            # move file if exists
            if os.path.exists(old_path):
                if not os.path.exists(new_path):
                    os.replace(old_path, new_path)
                else:
                    try:
                        os.remove(old_path)
                    except Exception:
                        pass

            f.file.name = new_name
            f.save(update_fields=['file'])


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0003_alter_file_workspace'),
    ]

    operations = [
        migrations.RunPython(move_uploads_forward, reverse_code=migrations.RunPython.noop),
    ]
