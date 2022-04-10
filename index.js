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
 async function parserDir (dir= [PATH_TO_STORAGE]) {
     let _isDir
     let _nextDir
     let tempRes
     let listDir = []

     // Если на вход пришла строка  - ее засуну в масив так как ниже работаю с масивом
     if (typeof dir === 'string') dir[0] = dir

     // Если в директории несколько элементов
      if (Array.isArray(dir)) {
          for (let string of dir) {
              _isDir = await isDir(string).then((res) => res)

              // Если директория
              if (_isDir) {

                  //смотрю вложеную директорию
                  _nextDir = await findDir(string).then((res) => res)

                  // рекурсивно вызываю эту же функцию
                  tempRes =  await parserDir(_nextDir)

                  // прохожусь по результирующему массиву и записываю его в список
                  tempRes.forEach((i)=>listDir.push(i))
              }

              // Если НЕ директория - значит файл
              else {

                  // тогда записываю в список путь к файлу
                  listDir.push(string)
              }
          }
      }
     return listDir
 }

parserDir().then((res)=>console.log(res))

// в результате получаю функцию которая проходит по всем вложеным директориям хранилища и находит пути к этим файлам
// обрабатываю если в папке более одного файла и исключая пустые папки. Список Выводиться в виде масива

// Result:

// Array(15) ["D:\F\storage\201\asd.txt", "D:\F\storage\201\sales.json", "D:\F\storage\202\asd.txt", "D:\F\storage\202\sales.json", "D:\F\storage\203\asd.txt", "D:\F\storage\203\sales.json", "D:\F\storage\204\asd.txt", "D:\F\storage\204\sales.json", "D:\F\storage\205\205_1\asd.txt", "D:\F\storage\205\205_1\sales.json", "D:\F\storage\205\205_2\app.js", "D:\F\storage\205\205_2\asd.txt", "D:\F\storage\205\205_2\sales.json", "D:\F\storage\205\asd.txt", "D:\F\storage\206\asd.txt"]
// 0 = "D:\F\storage\201\asd.txt"
// 1 = "D:\F\storage\201\sales.json"
// 2 = "D:\F\storage\202\asd.txt"
// 3 = "D:\F\storage\202\sales.json"
// 4 = "D:\F\storage\203\asd.txt"
// 5 = "D:\F\storage\203\sales.json"
// 6 = "D:\F\storage\204\asd.txt"
// 7 = "D:\F\storage\204\sales.json"
// 8 = "D:\F\storage\205\205_1\asd.txt"
// 9 = "D:\F\storage\205\205_1\sales.json"
// 10 = "D:\F\storage\205\205_2\app.js"
// 11 = "D:\F\storage\205\205_2\asd.txt"
// 12 = "D:\F\storage\205\205_2\sales.json"
// 13 = "D:\F\storage\205\asd.txt"
// 14 = "D:\F\storage\206\asd.txt"
// length = 15
//     [[Prototype]] = Array(0)
