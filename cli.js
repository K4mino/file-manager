import process from 'process';
import readline from 'readline';
import  os from 'os'
import {readMyFile, list, goUp, getUserName,writeMyFile,reNameFile,copy,move,remove, hash,compress,decompress} from './utils.js';

let currentDir = os.homedir()


const handleInput = (input) => {
    try {
        if(input.trim().startsWith('cd')){
            const path = input.slice(2).trim()
            try {
                process.chdir(path)
                console.log('Current directory:' + process.cwd())
            } catch (error) {
                throw 'Operation failed'
            }
        }
    
        if(input.trim().startsWith('ls')){
            try {
                list(currentDir)
            } catch (error) {
                throw 'Operation failed'
            }
        }
    
        if(input.trim().startsWith('up')){
            try {
                goUp()
            } catch (error) {
                throw 'Operation failed'
            }
        }
    
        if(input.trim().startsWith('cat')){
            try {
                const path = input.slice(3).trim()
                readMyFile(path)
            } catch (error) {
                throw 'Operation failed'
            }
        }
    
        if(input.trim().startsWith('add')){
            try {
                const filename = input.slice(3).trim()
                writeMyFile(filename)
            } catch (error) {
                throw 'Operation failed'
            }
        }
    
        if(input.trim().startsWith('rn')){
            try {
                const [command,filename,newFilename] = input.split(' ');
                reNameFile(filename.trim(),newFilename.trim())
            } catch (error) {
                throw 'Operation failed'
            }
        }
    
        if(input.trim().startsWith('cp')){
            try {
                const [command,filename,dirname] = input.split(' ');
                copy(filename.trim(),dirname.trim())
            } catch (error) {
                throw 'Operation failed'
            }
        }
    
        if(input.trim().startsWith('mv')){
            try {
                const [command,filename,dirname] = input.split(' ');
                move(filename.trim(),dirname.trim())
            } catch (error) {
                throw 'Operation failed'
            }
        }
    
        if(input.trim().startsWith('rm')){
            try {
                const [command,filename] = input.split(' ');
                remove(filename.trim())
            } catch (error) {
                throw 'Operation failed'
            }
        }
    
        if(input.trim().startsWith('hash')){
            try {
                const [command,filename] = input.split(' ');
                hash(filename.trim())
            } catch (error) {
                throw 'Operation failed'
            }
        }
        
        if(input.trim().startsWith('compress')){
            try {
                const [command,filename,destination] = input.split(' ');
                compress(filename.trim(),destination.trim())
            } catch (error) {
                throw 'Operation failed'
            }
        }

        if(input.trim().startsWith('decompress')){
            try {
                const [command,filename,destination] = input.split(' ');
                decompress(filename.trim(),destination.trim())
            } catch (error) {
                throw 'Operation failed'
            }
        }
    
        if(input.trim().startsWith('os')){
            const [command,property] = input.split(' ');
    
            if(property.slice(2) == 'EOL'){
                console.log(JSON.stringify(os.EOL))
            }
    
            if(property.slice(2) == 'cpus'){
                const amount = os.cpus().length
                const model = os.cpus()[0].model
                const clockRate = os.cpus()[0].speed/1000
                console.log(`Amount of CPUs: ${amount} | Model: ${model} | Clock Rate: ${clockRate.toFixed(2)}GHz`)
            }
    
            if(property.slice(2) == 'homedir'){
                console.log(os.homedir())
            }
    
            if(property.slice(2) == 'username'){
                console.log(os.hostname())
            }
    
            if(property.slice(2) == 'architecture'){
                console.log(os.arch())
            }
        }
    } catch (error) {
        throw 'Invalid input'
    }
}

const main = () => {

    process.chdir(currentDir)
    console.log(`Welcome to the File Manager, ${getUserName()}!`)
    console.log(`You are currently in`, currentDir)

    const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    readLine.on('line', async(input) => {
        await handleInput(input)
        readLine.prompt()
    })




    process.on('exit',() => {
        console.log(`Thank you for using File Manager, ${getUserName()}, goodbye!`)
    })
}



main()