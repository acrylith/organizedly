import Dexie from "dexie";

export const idb = new Dexie('myDataBase')
idb.version(2).stores({
    bookmarks: 'id++, title, url, groupID',
    groups: 'id++, title'
})

async function populate() {
    const defaultGroup = await idb.groups.add({
        title: 'Main'
    })
}

idb.on('populate', populate)