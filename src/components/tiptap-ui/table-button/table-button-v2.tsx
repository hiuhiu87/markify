/**
 * Table button component for TipTap editor
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
  if (!editor) return null;

  const addTable = (rows: number, cols: number) => {
    try {
      editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
    } catch (error) {
      console.warn('Table insertion failed:', error);
    }
  };

  const isTableActive = editor.isActive('table');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-8 w-8 p-0"
          title="Insert Table"
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

        {isTableActive && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem 
              onClick={() => {
                try {
                  editor.chain().focus().addColumnBefore().run();
                } catch (error) {
                  console.warn('Add column before failed:', error);
                }
              }}
              className="cursor-pointer"
            >
              Add Column Before
            </DropdownMenuItem>

            <DropdownMenuItem 
              onClick={() => {
                try {
                  editor.chain().focus().addColumnAfter().run();
                } catch (error) {
                  console.warn('Add column after failed:', error);
                }
              }}
              className="cursor-pointer"
            >
              Add Column After
            </DropdownMenuItem>

            <DropdownMenuItem 
              onClick={() => {
                try {
                  editor.chain().focus().addRowBefore().run();
                } catch (error) {
                  console.warn('Add row before failed:', error);
                }
              }}
              className="cursor-pointer"
            >
              Add Row Before
            </DropdownMenuItem>

            <DropdownMenuItem 
              onClick={() => {
                try {
                  editor.chain().focus().addRowAfter().run();
                } catch (error) {
                  console.warn('Add row after failed:', error);
                }
              }}
              className="cursor-pointer"
            >
              Add Row After
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem 
              onClick={() => {
                try {
                  editor.chain().focus().deleteColumn().run();
                } catch (error) {
                  console.warn('Delete column failed:', error);
                }
              }}
              className="cursor-pointer text-red-600"
            >
              Delete Column
            </DropdownMenuItem>

            <DropdownMenuItem 
              onClick={() => {
                try {
                  editor.chain().focus().deleteRow().run();
                } catch (error) {
                  console.warn('Delete row failed:', error);
                }
              }}
              className="cursor-pointer text-red-600"
            >
              Delete Row
            </DropdownMenuItem>

            <DropdownMenuItem 
              onClick={() => {
                try {
                  editor.chain().focus().deleteTable().run();
                } catch (error) {
                  console.warn('Delete table failed:', error);
                }
              }}
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
