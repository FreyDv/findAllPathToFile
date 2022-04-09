const fs = require('fs/promises')
const path = require('path')

//Переменная списка адресов файлов
let listFile = []
//Первоначальный путь к хранилищу
const PATH_TO_STORAGE = path.resolve(__dirname,'storage')

// Фунция формирует масив адресов елементов в заданной директории
async function findDir(pathX) {
    let dir = []
    dir = await fs.readdir(pathX).then((d) => d)
    dir = dir.map((value) => path.join(pathX, value))
    return dir
}
// Функция Возврашает tru если заданный путь является ПАПКОЙ
async function isDir(pathX){
    let res =await fs.stat(pathX).then((stat)=> stat)
    return res.isDirectory()
}
// Функция пробега по вложенностям и поиском файлов.
 async function X (dir= PATH_TO_STORAGE) {
     let _isDir
     let _nextDir

     // Если в директории несколько элементов
     if (Array.isArray(dir)) {
         for (let string of dir) {

             _isDir = await isDir(string).then((res) => res)
             // Если директория
             if (_isDir) {
                 //смотрю вложеную директорию
                 _nextDir = await findDir(string).then((res) => res)
                 // рекурсивно вызываю эту же функцию
                 await X(_nextDir)
             }
             // Если НЕ директория - значит файл
             else{
                 // тогда записываю в список путь к файлу
                 listFile.push(string)
             }
         }
     }
     //Если в дириктории один елемент
     else{
         _isDir = await (isDir(dir).then((res) => res))
         // Если дириктория
         if (_isDir) {
             //смотрю вложеную деректорию
             _nextDir = await findDir(dir).then((res) => res)
             // рекурсивно вызываю эту же функцию
             X(_nextDir)
         }
         // Если НЕ дириктория - значит файл
         else{
             // тогда записываю в список путь к файлу
             listFile.push(dir)
         }
     }
 }

 //Вызов основной функции прохода по вложеностям в результате undefined так как наверное then срабатывает по окончанию первого выполнения функции
// а так как там много рекурсии функция заканчивает свое выполнение 13 раз, по этому на первом окончании список пуст.
X().then((res)=>console.log(res))

// Но если подождать около 100 ms видно что логика функции работает
setTimeout(()=>console.log(listFile),100)

// но я не смог найти решение как обработать без setTimeout. Пробовал Promise.all() но он наверное не для этого(