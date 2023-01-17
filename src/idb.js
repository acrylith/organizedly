import Dexie from "dexie";

export const idb = new Dexie('myDataBase')
idb.version(1).stores({
    bookmarks: 'id++, title, url, groupID',
    groups: 'id++, title',
    settings: 'name&, value'
})

async function populate() {
    // eslint-disable-next-line
    const defaultGroup = await idb.groups.add({
        title: 'Main'
    })
    // eslint-disable-next-line
    const defaultSettings = await idb.settings.add({
        name: 'loc',
        value: null
    })
}

idb.on('populate', populate)