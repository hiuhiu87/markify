/**
 * Table buttonexport const TableButton: React.FC<TableButtonProps> = ({ editor }) => {
  if (!editor) return null;

  const addTable = (rows: number, cols: number) => {
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
  };

  const canInsertTable = editor.can().insertTable ? 
    editor.can().insertTable({ rows: 3, cols: 3, withHeaderRow: true }) : 
    true;nent for TipTap editor
 */

import React from 'react';
import { Button } from '@/components/tiptap-ui-primitive/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/tiptap-ui-primitive/dropdown-menu/dropdown-menu';
import { Editor } from '@tiptap/react';

interface TableButtonProps {
  editor: Editor;
}

export const TableButton: React.FC<TableButtonProps> = ({ editor }) => {
  const addTable = (rows: number, cols: number) => {
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
  };

  const canInsertTable = editor?.can().insertTable({ rows: 3, cols: 3, withHeaderRow: true });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={!canInsertTable}
          className="h-8 w-8 p-0"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 10h18M3 6h18m-9 8v8m-9-8v8m9-8h9m-9 0V6" 
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <DropdownMenuItem 
          onClick={() => addTable(3, 3)}
          className="cursor-pointer"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Insert 3×3 Table
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => addTable(4, 4)}
          className="cursor-pointer"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Insert 4×4 Table
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => addTable(5, 3)}
          className="cursor-pointer"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Insert 5×3 Table
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {editor?.isActive('table') && (
          <>
            <DropdownMenuItem 
              onClick={() => editor.chain().focus().addColumnBefore().run()}
              className="cursor-pointer"
            >
              Add Column Before
            </DropdownMenuItem>

            <DropdownMenuItem 
              onClick={() => editor.chain().focus().addColumnAfter().run()}
              className="cursor-pointer"
            >
              Add Column After
            </DropdownMenuItem>

            <DropdownMenuItem 
              onClick={() => editor.chain().focus().addRowBefore().run()}
              className="cursor-pointer"
            >
              Add Row Before
            </DropdownMenuItem>

            <DropdownMenuItem 
              onClick={() => editor.chain().focus().addRowAfter().run()}
              className="cursor-pointer"
            >
              Add Row After
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem 
              onClick={() => editor.chain().focus().deleteColumn().run()}
              className="cursor-pointer text-red-600"
            >
              Delete Column
            </DropdownMenuItem>

            <DropdownMenuItem 
              onClick={() => editor.chain().focus().deleteRow().run()}
              className="cursor-pointer text-red-600"
            >
              Delete Row
            </DropdownMenuItem>

            <DropdownMenuItem 
              onClick={() => editor.chain().focus().deleteTable().run()}
              className="cursor-pointer text-red-600"
            >
              Delete Table
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
