const { expect } = require('chai')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

const CommandModel = require('../model/Command')

describe('/model/Command', () => {
  const Command = CommandModel(sequelize, dataTypes)
  const command = new Command()

  checkModelName(Command)('commands')

  context('properties', () => {
    ;['id', 'address', 'phone', 'status', 'total'].forEach(checkPropertyExists(command))
  })

  


})