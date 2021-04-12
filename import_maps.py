import json
from os import listdir
from os.path import isfile, join

data = {}

# with open('../wotv-ffbe-dump/map/arena00001_set.json') as json_file:
#     data = json.load(json_file)
#     # for p in data['info']:
#     #     print('Name: ' + p['angle_override'])
#     #     print('')
#     print(data['info'])


fileNames = [f for f in listdir('../wotv-ffbe-dump/map') if isfile(join('../wotv-ffbe-dump/map', f))]

data = {}
for fileName in fileNames:
    with open('../wotv-ffbe-dump/map/' + fileName) as json_file:
        rawData = json.load(json_file)

        data[fileName[:-5]] = {}
        if 'drop_table_list' in rawData:
            data[fileName[:-5]]['drop_table_list'] = {}
            for dropTable in rawData['drop_table_list']:
                if dropTable['iname'] != 'CRYSTAL_00':
                    data[fileName[:-5]]['drop_table_list'][dropTable['iname']] = dropTable

        if 'enemy' in rawData:
            enemy = []
            for rawEnemy in rawData['enemy']:
                reducedEnemy = {}
                reducedEnemy['iname'] = rawEnemy['iname']
                reducedEnemy['x'] = rawEnemy['x']
                reducedEnemy['y'] = rawEnemy['y']
                reducedEnemy['lv'] = rawEnemy['lv']
                reducedEnemy['elem'] = rawEnemy['elem']

                if 'brave' in rawEnemy:
                    reducedEnemy['brave'] = rawEnemy['brave']
                if 'faith' in rawEnemy:
                    reducedEnemy['faith'] = rawEnemy['faith']
                if 'skills' in rawEnemy:
                    reducedEnemy['skills'] = rawEnemy['skills']
                if 'drop' in rawEnemy:
                    reducedEnemy['drop'] = rawEnemy['drop']
                if 'side' in rawEnemy:
                    reducedEnemy['side'] = rawEnemy['side']
                enemy.append(reducedEnemy)
            data[fileName[:-5]]['enemy'] = enemy

        if 'party' in rawData:
            party = []
            for rawParty in rawData['party']:
                reducedParty = {}
                reducedParty['x'] = rawParty['x']
                reducedParty['y'] = rawParty['y']
                party.append(reducedParty)
            data[fileName[:-5]]['party'] = party

with open('data/map/gl/maps.json', 'w') as outfile:
    json.dump(data, outfile)
