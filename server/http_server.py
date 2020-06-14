from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys
import os
import json

def GetCameraHandler(directory, config_dir = "/tmp"):
  class CameraHTTPRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
      py_version = sys.version_info
      self.config_file = os.path.join(config_dir, 'config.json')
      if(py_version.major >= 3 and py_version.minor >= 8):
        super().__init__(*args, directory=directory, **kwargs)
      else:
        os.chdir(directory)
        super().__init__(*args, **kwargs)

    # Custom POST handler for different interactions.
    def do_POST(self):
      content_length = int(self.headers.get('Content-Length'))
      path = self.path;
      if path == '/update_config':
        config = json.loads(self.rfile.read(content_length))
        with open(self.config_file, 'w') as f:
          json.dump(config, f)
        print('Saving: {}'.format(self.config_file))
        self.send_response(200)
      else:
        self.send_response(400)
      self.end_headers()

  return CameraHTTPRequestHandler

def run_server(server=HTTPServer, directory = os.path.dirname(os.path.abspath(__file__)), port = 8000, config_dir = '/tmp'):
  addr = ('',port)
  handler = GetCameraHandler(directory, config_dir)
  httpd = server(addr, handler)
  try:
    httpd.serve_forever()
  except KeyboardInterrupt:
    pass
  httpd.server_close()

if __name__ == '__main__':
  run_server()

