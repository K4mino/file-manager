import process from 'process';
import { readdir,writeFile,rename,rm ,readFile} from 'node:fs/promises';
import { stat } from 'fs/promises';
import fs from 'fs';
import crypto from 'crypto';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import path from 'path';
const getUserName = () => {
    return process.argv[2].slice(11)
}

const list = async(currentDir) => {
    try {
        const files = await readdir(currentDir)
        const filesWithDetails = await Promise.all(
            files.map(async(file,i) => {
                const filePath = `${currentDir}/${file}`
                const stats = await stat(filePath)
                const fileType = stats.isDirectory() ? 'directory' : 'file'
    
                return {
                    Name:file,
                    Type: fileType
                }
            })
        )
        console.table(filesWithDetails)
    } catch (error) {
        throw 'Operation failed'
    }
}

const goUp = () => {
    try {
        process.chdir('..')
        console.log('Current directory:' + process.cwd())
    } catch (error) {
        throw 'Operation failed'
    }
}

const readMyFile = async(filename) => {
    try {
        const filePath = `${process.cwd()}/${filename}`;
        const readable = await fs.createReadStream(filePath,{encoding: 'utf-8'})
        
        readable.on('data', (chunk) => {
            console.log(chunk)
        })
    } catch (error) {
        throw 'Operation failed'
    }
}

const writeMyFile = async(filename) => {
    try {
        await writeFile(filename,'',{encoding: 'utf-8'})
        console.log('File created successfully')
    } catch (error) {
        throw 'Operation failed'
    }
}


const reNameFile = async(filename,newFilename) => {
    try {
        const filePath = `${process.cwd()}/${filename}`;
        const newFilePath = `${process.cwd()}/${newFilename}`
        await rename(filePath,newFilePath)
        console.log('File renamed successfully')
    } catch (error) {
        throw 'Operation failed'
    }
} 

const copy = async(filename,dirname) => {
    try {
        const filePath = `${process.cwd()}/${filename}`;
        const dirPath = `${process.cwd()}/${dirname}`;
        
        const readable = await fs.createReadStream(filePath)

        readable.pipe(fs.createWriteStream(`${dirPath}/${filename}`))

        console.log('File copied successfully')
    } catch (error) {
        throw 'Operation failed'
    }
}

const move = async(filename,dirname) => {
    try {
        await copy(filename,dirname)
        const filePath = `${process.cwd()}/${filename}`;
        await rm(filePath)
        console.log('File moved successfully')
    } catch (error) {
        throw 'Operation failed'
    }
}

const remove = async(filename) => {
    try {
        const filePath = `${process.cwd()}/${filename}`;

        await rm(filePath)
        console.log('File removed successfully')
    } catch (error) {
        throw 'Operation failed'
    }
}

const hash = async(filename) => {
    try {
        const filePath = `${process.cwd()}/${filename}`;
        const data = await readFile(filePath,{encoding: 'utf-8'})
        const hash = crypto.createHash('sha256').update(data).digest('hex')
        console.log('Hash:',hash)
    } catch (error) {
        throw 'Operation failed'
    }
}

const compress = async(filename,destination) => {
    try {
        const filePath = `${process.cwd()}/${filename}`;
        const dirPath = `${process.cwd()}/${destination}`;

        const read =  await fs.createReadStream(filePath)
        const write = await fs.createWriteStream(dirPath)
        const brotli = zlib.createBrotliCompress()

        const stream  = read.pipe(brotli).pipe(write)

        stream.on('finish',()=>{
            console.log('File compressed successfully')
        })
    } catch (error) {
        throw 'Operation failed'
    }
}

const decompress = async() => {
    try {
        const filePath = `${process.cwd()}/${filename}`;
        const dirPath = `${process.cwd()}/${destination}`;

        const read =  await fs.createReadStream(filePath)
        const write = await fs.createWriteStream(dirPath)
        const brotli = zlib.createBrotliDecompress()

        const stream  = read.pipe(brotli).pipe(write)

        stream.on('finish',()=>{
            console.log('File decompressed successfully')
        })
    } catch (error) {
        throw 'Operation failed'
    }
}

export {
    getUserName,
    list,
    goUp,
    readMyFile,
    writeMyFile,
    reNameFile,
    copy,
    move,
    remove,
    hash,
    compress,
    decompress
}