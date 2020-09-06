# Generated by Django 3.1.1 on 2020-09-06 06:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('classroom', '0005_answersheet_quiz'),
    ]

    operations = [
        migrations.AddField(
            model_name='studymaterial',
            name='class_name',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, to='classroom.class'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='studymaterial',
            name='detail',
            field=models.TextField(default='1'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='studymaterial',
            name='topic',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='answersheet',
            name='quiz',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answersheets', to='classroom.quiz'),
        ),
    ]
