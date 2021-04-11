const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

function listContacts() {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return
        };
        console.table(JSON.parse(data));
  })
};

function getContactById(contactId) {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
             console.log(err);
            return
        };
        const contacts = JSON.parse(data);
        const findedContact = contacts.find(({ id }) => id == contactId);
        if (findedContact) {console.table(findedContact)} else console.error('no such contact'); 
  })
};

function removeContact(contactId) {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return
        }
        const contacts = JSON.parse(data);
        const filteredContacts = contacts.filter(({ id }) => id != contactId);
        fs.writeFile(
            contactsPath,
            `${JSON.stringify(filteredContacts)}`,
            (err) => {
                if (err) {
                    console.log(err)
                    return
                }
            })
    })
};

function addContact(name, email, phone) {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return
        }
        const contacts = JSON.parse(data);
        const id = contacts.length + 1;
        contacts.push({ id, name, email, phone });
        
        fs.writeFile(contactsPath,
        `${JSON.stringify(contacts)}`,
            (err) => {
                if (err) {
                    console.log(err);
                    return
                }
            })
    })
};
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};