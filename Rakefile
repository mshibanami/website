# coding: utf-8

require 'rubocop/rake_task'
require 'rspec/core/rake_task'
require 'rake/clean'

RuboCop::RakeTask.new(:rubocop)

RSpec::Core::RakeTask.new('spec')
task default: :spec
