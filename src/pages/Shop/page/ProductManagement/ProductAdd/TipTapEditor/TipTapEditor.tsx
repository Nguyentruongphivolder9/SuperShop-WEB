import { EditorContent, useEditor } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import TipTapMenuBar from './TipTapMenuBar'
import { Control, Controller } from 'react-hook-form'
import { FormDataProduct } from 'src/contexts/productAdd.context'

interface Props {
  control: Control<FormDataProduct, any>
}

const content = ``
const extensions = [StarterKit, Underline]

export default function TipTapEditor({ control }: Props) {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class:
          'min-h-72 p-2 text-[#333333] text-sm prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none'
      }
    }
  })

  if (!editor) {
    return null
  }

  return (
    <Controller
      name='description'
      control={control}
      defaultValue=''
      render={({ field }) => {
        editor.on('update', () => {
          field.onChange(editor.getHTML())
        })

        return (
          <div className='rounded-md overflow-hidden flex flex-col border'>
            <TipTapMenuBar editor={editor} />
            <EditorContent editor={editor} />
          </div>
        )
      }}
    />
  )
}
