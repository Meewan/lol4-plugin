#! /usr/share/python
import os
import sys
import zipfile


def get_dir():
    return os.path.dirname(os.path.realpath(__file__))


def load_file(path):
    with open(path, 'r') as f:
        return f.read()


def remove_file(path):
    try:
        os.remove(path)
    except OSError, err:
        if not err.errno == 2:
            raise


def generate_string(path, name):
    file_content = load_file(path)
    file_escaped = file_content.replace('`', '\\`')
    template = 'const %(name)s = `%(content)s`;\n'
    return template % {
        'name': name,
        'content': file_escaped
    }


def generate_injectable_file():
    css = generate_string(get_dir() + '/injectable/style.css', 'css')
    js = generate_string(get_dir() + '/injectable/script.js', 'js')
    remove_file(get_dir() + '/plugin/injection.js')
    with open(get_dir() + '/plugin/injection.js', 'w') as f:
        f.write(css + js)


def generate_zip(target):
    remove_file(target)
    dir_path = get_dir() + '/plugin'
    zf = zipfile.ZipFile(target, "w")
    for dirname, subdirs, files in os.walk(dir_path):
        for filename in files:
            file_path = os.path.join(dirname, filename)
            file_zip_path = file_path[len(dir_path):]
            zf.write(file_path, file_zip_path)
    zf.close()


if __name__ == "__main__":
    generate_zip_file = True
    generate_injectable_file()
    if len(sys.argv) > 1:
        if sys.argv[0] == 'partial':
            generate_zip_file = False

    if generate_zip_file:
        generate_zip(get_dir() + '/lol4-plugin.zip')
