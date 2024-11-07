'use client'	

import {BlockNoteEditor,PartialBlock} from '@blocknote/core'
import { BlockNoteViewRaw, useCreateBlockNote } from '@blocknote/react'
import { useTheme } from "next-themes"
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEdgeStore } from "@/lib/edgestore"

interface EditorProps{
  onChange:(value:string) => void
  initialContent?:string
  editable?:boolean
}

function Editor ({onChange,initialContent,editable}:EditorProps) {

  const {resolvedTheme} = useTheme()
  const {edgestore} = useEdgeStore()

  const handleUpload = async (file:File) => {
    const response = await edgestore.publicFiles.upload({file})

    return response.url
  }

  const editor:BlockNoteEditor = useCreateBlockNote({
    initialContent:initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
  
    uploadFile:handleUpload
  })

      
return (
    <div>
      <BlockNoteView 
        editor={editor} 
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'} 
        editable={editable}
        />
    </div>
  )
}

export default Editor