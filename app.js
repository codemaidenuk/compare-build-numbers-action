const core = require('@actions/core')
const github = require('@actions/github')
const semver = require('semver')

try {
  const buildA = semver.clean(core.getInput('build-a'))
  if (!semver.valid(buildA)) {
    throw new Error(`Build A has an invalid build number (${buildA}). Please ensure your build follows semver rules https://semver.org.`)
  }
  const buildB = semver.clean(core.getInput('build-b'))
  if (!semver.valid(buildB)) {
    throw new Error(`Build B has an invalid build number (${buildB}). Please ensure your build follows semver rules https://semver.org.`)
  }
  const passIf = core.getInput('pass-if')
  const eval = result => {
    console.log(`Evaluating ${buildA} ${passIf} ${buildB}.`)
    if (!result) {
      throw new Error(`Build comparison failed (failed because ${buildA} ${passIf} ${buildB} evaluated to false).`)
    }
  }
  switch (passIf) {
    case '<':
    case 'lt':
      return eval(semver.lt(buildA, buildB))
    case '<=':
    case 'lte':
      return eval(semver.lte(buildA, buildB))
    case '=':
    case 'eq':
      return eval(semver.eq(buildA, buildB))
    case '<>':
    case 'neq':
      return eval(semver.neq(buildA, buildB))
    case '>=':
    case 'gte':
      return eval(semver.gte(buildA, buildB))
    case '>':
    case 'ge':
      return eval(semver.ge(buildA, buildB))
    default:
      throw new Error(`The comparator you provided (${passIf}) is not valid. Please check the actions description for valid comparators.`)
  }
} catch (error) {
  core.setFailed(error.message)
}