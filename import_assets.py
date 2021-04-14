#!/usr/bin/env python3

import json
from os import listdir, path, walk
from os.path import isfile, join, expanduser
from shutil import copyfile
import struct
import io
from PIL import Image

def auto_crop(file_path, dst_path = None):
  img = Image.open(file_path)

  left, upper = img.size
  right, lower = 0, 0

  if left > 1 and upper > 1:
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

    img = img.crop(((left, upper, right, lower)))
    if dst_path:
      img.save(dst_path)

  return img


print('### Update Items')
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
]
for itemFolder in itemFolders:
  fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser(itemFolder)) for f in fn]
  for fileName in fileNames:
    smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
    if not isfile(join('client/assets/items', smallFileName)) and smallFileName != "Thumbs.db@SynoEAStream" and smallFileName != "Thumbs.db" and smallFileName != ".DS_Store" and smallFileName != ".DS_Store@SynoResource":
      print('new item : ' + smallFileName)
      auto_crop(fileName, join('client/assets/items', smallFileName))


print('### Update Cards')
cardFolders = [
  '../wotv-assets/japan/vision/lapis',
  '../wotv-assets/japan/vision/collabo',
  '../wotv-assets/global/vision/lapis',
  '../wotv-assets/global/vision/lapisww',
  '../wotv-assets/global/vision/collabo'
]
for cardFolder in cardFolders:
  fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser(cardFolder)) for f in fn]
  for fileName in fileNames:
    smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
    if not isfile(join('client/assets/cards', smallFileName)) and smallFileName != "Thumbs.db@SynoEAStream" and smallFileName != "Thumbs.db" and smallFileName != ".DS_Store" and smallFileName != ".DS_Store@SynoResource":
      print('new card : ' + smallFileName)
      auto_crop(fileName, join('client/assets/cards', smallFileName))


print('### Update Equipments')
equipmentFolders = [
  '../wotv-assets/japan/artifact/lapis',
  '../wotv-assets/japan/artifact/collabo',
  '../wotv-assets/global/artifact/lapis',
  '../wotv-assets/global/artifact/lapisww',
  '../wotv-assets/global/artifact/collabo'
]
for equipmentFolder in equipmentFolders:
  fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser(equipmentFolder)) for f in fn]
  for fileName in fileNames:
    smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
    if not isfile(join('client/assets/equipments', smallFileName)) and smallFileName != "Thumbs.db@SynoEAStream" and smallFileName != "Thumbs.db" and smallFileName != ".DS_Store" and smallFileName != ".DS_Store@SynoResource":
      print('new equipment : ' + smallFileName)
      auto_crop(fileName, join('client/assets/equipments', smallFileName))


print('### Update Jobs')
jobFolders = [
  '../wotv-assets/japan/unit/collabo/job',
  '../wotv-assets/japan/unit/lapis/job',
  '../wotv-assets/global/unit/collabo/job',
  '../wotv-assets/global/unit/lapis/job',
  '../wotv-assets/global/unit/lapisww/job'
]
for jobFolder in jobFolders:
  fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser(jobFolder)) for f in fn]
  for fileName in fileNames:
    smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
    if smallFileName.split('_')[len(smallFileName.split('_')) - 1] != 'm.png' and smallFileName.split('_')[len(smallFileName.split('_')) - 1] != 'item.png' and not isfile(join('client/assets/jobs', smallFileName)) and smallFileName != "Thumbs.db@SynoEAStream" and smallFileName != "Thumbs.db" and smallFileName != ".DS_Store" and smallFileName != ".DS_Store@SynoResource":
      print('new job : ' + smallFileName)
      auto_crop(fileName, join('client/assets/jobs', smallFileName))


print('### Update Units')
unitFolders = [
  '../wotv-assets/japan/unit/collabo/unit',
  '../wotv-assets/japan/unit/lapis/unit',
  '../wotv-assets/global/unit/collabo/unit',
  '../wotv-assets/global/unit/lapis/unit',
  '../wotv-assets/global/unit/lapisww/unit'
]
for unitFolder in unitFolders:
  fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser(unitFolder)) for f in fn]
  for fileName in fileNames:
    smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
    if (
      len(fileName.split('/')) >= 8
      and fileName.split('/')[7] == 'icon'
      and (
        len(smallFileName.split('_')) == 1
        or (
          smallFileName.split('_')[len(smallFileName.split('_')) - 1] != 'angry.png'
          and smallFileName.split('_')[len(smallFileName.split('_')) - 1] != 'sad.png'
          and smallFileName.split('_')[len(smallFileName.split('_')) - 1] != 'smile.png'
          and smallFileName.split('_')[len(smallFileName.split('_')) - 1] != 'surprised.png'
          and smallFileName.split('_')[len(smallFileName.split('_')) - 1] != 'surprosed.png'
        )
      )
      and not isfile(join('client/assets/units', smallFileName)) and smallFileName != "Thumbs.db@SynoEAStream" and smallFileName != "Thumbs.db" and smallFileName != ".DS_Store" and smallFileName != ".DS_Store@SynoResource"
    ):
      print(fileName)
      print('new unit : ' + smallFileName)
      auto_crop(fileName, join('client/assets/units', smallFileName))


print('### Update Titles')
titleFolders = [
  '../wotv-assets/japan/localize/ja/texture/award',
  '../wotv-assets/global/localize/en/texture/award'
]
for titleFolder in titleFolders:
  fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser(titleFolder)) for f in fn]
  for fileName in fileNames:
    smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
    if len(smallFileName.split('_')) > 1 and smallFileName.split('_')[1] == 'special':
      croppedFileNameTab = smallFileName.split('_')
      del croppedFileNameTab[0]
      del croppedFileNameTab[0]

      if smallFileName != "Thumbs.db@SynoEAStream" and smallFileName != "Thumbs.db" and smallFileName != ".DS_Store" and smallFileName != ".DS_Store@SynoResource":
        auto_crop(fileName, join('client/assets/titles', '_'.join(croppedFileNameTab)))


def extract_map_grid(fileName):
    if isinstance(fileName, str):
        f = open(fileName, "rb")
    elif isinstance(fileName, (bytearray, bytes)):
        f = io.BytesIO(fileName)

    mapTbl = []
    f.read(4)
    tile_count, = struct.unpack("<I", f.read(4))
    for _ in range(tile_count):
        x,y,h,tl = struct.unpack("<IIIH", f.read(14))
        mapTile = {}
        mapTile['x'] = x
        mapTile['y'] = y
        mapTile['h'] = h
        mapTile['t'] = f.read(tl).decode("ascii")
        mapTbl.append(mapTile)

    return mapTbl


print('### Import GL Maps')
data = {}
fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser('../wotv-assets/global/map/lapis/grid')) for f in fn]
for fileName in fileNames:
    smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
    if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.txt'):
        data[smallFileName[:-12]] = extract_map_grid(fileName)
    if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.json'):
        data[smallFileName[:-13]] = extract_map_grid(fileName)

fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser('../wotv-assets/global/map/collabo/grid')) for f in fn]
for fileName in fileNames:
    smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
    if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.txt'):
        data[smallFileName[:-12]] = extract_map_grid(fileName)
    if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.json'):
        data[smallFileName[:-13]] = extract_map_grid(fileName)

with open('data/map/gl/grids.json', 'w') as outfile:
    json.dump(data, outfile)


print('### Import JP Maps')
data = {}
fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser('../wotv-assets/japan/map/lapis/grid')) for f in fn]
for fileName in fileNames:
    smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
    if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.txt'):
        data[smallFileName[:-12]] = extract_map_grid(fileName)
    if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.json'):
        data[smallFileName[:-13]] = extract_map_grid(fileName)

fileNames = [path.join(dp, f) for dp, dn, fn in walk(path.expanduser('../wotv-assets/japan/map/collabo/grid')) for f in fn]
for fileName in fileNames:
    smallFileName = fileName.split('/')[len(fileName.split('/')) - 1]
    if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.txt'):
        data[smallFileName[:-12]] = extract_map_grid(fileName)
    if (smallFileName.split('_')[len(smallFileName.split('_')) - 1] == 'Default.json'):
        data[smallFileName[:-13]] = extract_map_grid(fileName)

with open('data/map/jp/grids.json', 'w') as outfile:
    json.dump(data, outfile)