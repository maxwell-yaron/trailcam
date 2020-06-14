#!/usr/bin/env python3

import time
import asyncio
from threading import Thread
import cv2
import websockets
from config import *
from http_server import run_server

async def send_image(ws, path):
  cap = cv2.VideoCapture(0);
  encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]
  while(True):
    try:
      ret, frame = cap.read()
      result, encimg = cv2.imencode('.jpg', frame, encode_param)
      if(result):
        await ws.send(encimg.tobytes())
    except KeyboardInterrupt:
      print("Exiting...")
      break;

def run_webserver():
  run_server(port=HTTP_PORT, config_dir = CONFIG_DIR)

def run_img_server():
  asyncio.set_event_loop(asyncio.new_event_loop())
  img_server = websockets.serve(send_image, IP, IMG_PORT)
  asyncio.get_event_loop().run_until_complete(img_server)
  asyncio.get_event_loop().run_forever()

def main():
  web = Thread(target=run_webserver)
  img = Thread(target=run_img_server)
  web.start()
  img.start()
  web.join()
  img.join()

if __name__ == '__main__':
  main()
