require 'spec_helper'
require 'util'

describe Util do
    context 'file_basename' do
        it 'outputs a filename whitch does not have specified extensions' do
            expect(Util.file_basename('test.md', ['.md'])).to eq 'test'
            expect(Util.file_basename('test.css', ['.md', '.css'])).to eq 'test'
            expect(Util.file_basename('/path/to/test.css', ['.md', '.css'])).to eq 'test'
        end
    end
end
