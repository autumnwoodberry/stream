from django.conf import settings
from django.shortcuts import render
import json
import os

def index(request):

    context = {
        'version': 'null'
    }

    with open(os.path.join(settings.BASE_DIR, 'package.json')) as package:
        info = json.load(package)
        context['version'] = info.get('version', 'null')

    return render(request, 'visualizer/index.html', context)
