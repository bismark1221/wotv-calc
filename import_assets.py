#!/usr/bin/env python3

from os import listdir, path, walk
from os.path import isfile, join, expanduser
from shutil import copyfile
import struct
import io
from PIL import Image

def auto_crop(file_path, dst_path = None):
  # open an image file
  img = Image.open(file_path)

  left, upper = img.size
  right, lower = 0, 0

  alpha = img.getdata(3)
  pixels = [
    (x,y)
    for y in range(img.height)
    for x in range(img.width)
    if alpha[y*img.width + x] != 0
  ]
  left  = min(pixels, key=lambda x: x[0])[0]
  right = max(pixels, key=lambda x: x[0])[0]
  upper = min(pixels, key=lambda x: x[1])[1]
  lower = max(pixels, key=lambda x: x[1])[1]
  # crop the image
  img = img.crop(((left, upper, right, lower)))
  if dst_path:
    img.save(dst_path)
  return img

itemFolders = [
  '../wotv-assets/japan/itemicon/lapis/m',
  '../wotv-assets/japan/itemicon/lapis/s',
  '../wotv-assets/japan/itemicon/collabo/m',
  '../wotv-assets/japan/itemicon/collabo/s',
  '../wotv-assets/global/itemicon/lapis/m',
  '../wotv-assets/global/itemicon/lapis/s',
  '../wotv-assets/global/itemicon/lapisww/m',
  '../wotv-assets/global/itemicon/lapisww/s',
  '../wotv-assets/global/itemicon/collabo/m',
  '../wotv-assets/global/itemicon/collabo/s'
];
for itemFolder in itemFolders:
  fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser(itemFolder)) for f in fn]
  for fileName in fileNames:
    smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
    if not isfile(join('client/assets/items', smallFileName)) and smallFileName != "Thumbs.db@SynoEAStream" and smallFileName != "Thumbs.db" and smallFileName != ".DS_Store" and smallFileName != ".DS_Store@SynoResource":
      print('new item : ' + smallFileName)
      auto_crop(fileName, join('client/assets/items', smallFileName))


cardFolders = [
  '../wotv-assets/japan/vision/lapis',
  '../wotv-assets/japan/vision/collabo',
  '../wotv-assets/global/vision/lapis',
  '../wotv-assets/global/vision/lapisww',
  '../wotv-assets/global/vision/collabo'
];
for cardFolder in cardFolders:
  fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser(cardFolder)) for f in fn]
  for fileName in fileNames:
    smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
    if not isfile(join('client/assets/cards', smallFileName)) and smallFileName != "Thumbs.db@SynoEAStream" and smallFileName != "Thumbs.db" and smallFileName != ".DS_Store" and smallFileName != ".DS_Store@SynoResource":
      print('new card : ' + smallFileName)
      auto_crop(fileName, join('client/assets/cards', smallFileName))


equipmentFolders = [
  '../wotv-assets/japan/artifact/lapis',
  '../wotv-assets/japan/artifact/collabo',
  '../wotv-assets/global/artifact/lapis',
  '../wotv-assets/global/artifact/lapisww',
  '../wotv-assets/global/artifact/collabo'
];
for equipmentFolder in equipmentFolders:
  fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser(equipmentFolder)) for f in fn]
  for fileName in fileNames:
    smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
    if not isfile(join('client/assets/equipments', smallFileName)) and smallFileName != "Thumbs.db@SynoEAStream" and smallFileName != "Thumbs.db" and smallFileName != ".DS_Store" and smallFileName != ".DS_Store@SynoResource":
      print('new equipment : ' + smallFileName)
      auto_crop(fileName, join('client/assets/equipments', smallFileName))