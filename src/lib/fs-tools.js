import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname,join } from "path"


const{readJSON,writeJSON,writeFile}=fs


const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

const authorsFilePath = join(dataFolderPath, "newBlog.json")
export const getFileBuffer = () =>readJSON(authorsFilePath)
export const writeFileBuffer = (content) =>writeJSON(authorsFilePath,content)  
