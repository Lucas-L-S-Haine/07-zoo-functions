const data = require('./data');

function getSpeciesName(animalId) {
  return data.species.find((species) => species.id === animalId).name;
}

const staffList = {};
data.employees.forEach((staff, i) => {
  staffList[`${staff.firstName} ${staff.lastName}`] = staff
    .responsibleFor.map(getSpeciesName);
});

function getAnimalsOlderThan(animal, age) {
  const species = data.species.find((critter) => critter.name === animal);
  return !species.residents.find((resident) => resident.age < age);
}

function getEmployeeByName(employeeName) {
  return data.employees.find((name) => employeeName === name
    .firstName || employeeName === name.lastName) || {};
}

function createEmployee(personalInfo, associatedWith) {
  return {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
}

function isManager(id) {
  const personel = data.employees;
  return personel.some((value) => value.managers
    .find((managerId) => managerId === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: managers || [],
    responsibleFor: responsibleFor || [],
  };
  data.employees.push(newEmployee);
}

function countAnimals(species) {
  if (species) {
    return data.species.find((animal) => animal.name === species).residents.length;
  }
  const animals = {};
  data.species.forEach((animal) => {
    animals[animal.name] = animal.residents.length;
  });
  return animals;
}

function calculateEntry(entrants) {
  if (!entrants) {
    return 0;
  }
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  let totalEntry = 0;
  totalEntry += Adult * data.prices.Adult;
  totalEntry += Senior * data.prices.Senior;
  totalEntry += Child * data.prices.Child;
  return totalEntry;
}

function getAnimalMap(options) {
  // seu código aqui
}

function getSchedule(dayName) {
  // seu código aqui
}

function getOldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  let { Adult, Senior, Child } = data.prices;
  Adult = Math.ceil(Adult * (100 + percentage)) / 100;
  Senior = Math.ceil(Senior * (100 + percentage)) / 100;
  Child = Math.ceil(Child * (100 + percentage)) / 100;
  data.prices.Adult = Adult;
  data.prices.Senior = Senior;
  data.prices.Child = Child;
  return data.prices;
}

function getEmployeeCoverage(idOrName) {
  if (!idOrName) {
    return staffList;
  }
  let infoType = data.employees.some((employee) => employee.id === idOrName) ? 'id' : false;
  infoType = data.employees.some((employee) => employee.firstName === idOrName)
    ? 'firstName' : infoType;
  infoType = data.employees.some((employee) => employee.lastName === idOrName)
    ? 'lastName' : infoType;
  const staff = data.employees.findIndex((employee) => employee[infoType] === idOrName);
  const staffAnimals = data.employees[staff]
    .responsibleFor.map(getSpeciesName);
  const staffName = `${data.employees[staff].firstName} ${data.employees[staff].lastName}`;
  const coverage = {};
  coverage[staffName] = staffAnimals;
  return coverage;
}

console.table(getEmployeeCoverage('Emery'));
// console.table(data.employees);

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  // getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
