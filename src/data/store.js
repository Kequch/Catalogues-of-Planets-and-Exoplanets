/**
 * Реактивное хранилище данных приложения.
 * Используется reactive для глобального состояния.
 */
import { reactive } from 'vue'

// Начальные данные для звёздных систем
const initialStarSystems = [
  {
    id: 1,
    name: 'Солнечная система',
    description: 'Планетная система, включающая в себя центральную звезду — Солнце — и все естественные космические объекты, вращающиеся вокруг неё.'
  },
  {
    id: 2,
    name: 'TRAPPIST-1',
    description: 'Планетная система, состоящая из ультрахолодного красного карлика TRAPPIST-1 и семи планет земного типа, расположенная в 39 световых годах от Солнца.'
  },
  {
    id: 3,
    name: 'Kepler-90',
    description: 'Звёздная система в созвездии Дракона, содержащая 8 известных планет. Единственная кроме Солнечной системы с таким количеством планет.'
  },
  {
    id: 4,
    name: 'Проксима Центавра',
    description: 'Ближайшая к Солнцу звезда, красный карлик в системе Альфа Центавра. Имеет как минимум две подтверждённые планеты.'
  },
  {
    id: 5,
    name: 'Kepler-442',
    description: 'Оранжевый карлик в созвездии Лиры на расстоянии около 1206 световых лет. Содержит экзопланету в зоне обитаемости.'
  }
]

// Начальные данные для планет
const initialPlanets = [
  {
    id: 1,
    name: 'Земля',
    description: 'Третья планета от Солнца и единственная известная планета, на которой существует жизнь. Имеет жидкую воду и плотную атмосферу.',
    starSystemId: 1,
    discoveryDate: ''
  },
  {
    id: 2,
    name: 'Марс',
    description: 'Четвёртая планета от Солнца, известная как "Красная планета" из-за оксида железа на поверхности.',
    starSystemId: 1,
    discoveryDate: ''
  },
  {
    id: 3,
    name: 'Юпитер',
    description: 'Крупнейшая планета Солнечной системы, газовый гигант с массой в 318 раз больше земной.',
    starSystemId: 1,
    discoveryDate: ''
  },
  {
    id: 4,
    name: 'Сатурн',
    description: 'Шестая планета от Солнца, известная своими кольцами из частиц льда и горных пород.',
    starSystemId: 1,
    discoveryDate: ''
  },
  {
    id: 5,
    name: 'TRAPPIST-1e',
    description: 'Экзопланета в зоне обитаемости звезды TRAPPIST-1. Потенциально может содержать жидкую воду.',
    starSystemId: 2,
    discoveryDate: '2017-02-22'
  },
  {
    id: 6,
    name: 'TRAPPIST-1f',
    description: 'Экзопланета с массой, близкой к земной. Находится на внешнем крае зоне обитаемости.',
    starSystemId: 2,
    discoveryDate: '2017-02-22'
  },
  {
    id: 7,
    name: 'Kepler-90i',
    description: 'Скалистая экзопланета, самая внутренняя в системе Kepler-90. Обнаружена с помощью ИИ Google.',
    starSystemId: 3,
    discoveryDate: '2017-12-14'
  },
  {
    id: 8,
    name: 'Проксима Центавра b',
    description: 'Ближайшая к Земле экзопланета, расположена в зоне обитаемости Проксимы Центавра.',
    starSystemId: 4,
    discoveryDate: '2016-08-24'
  },
  {
    id: 9,
    name: 'Kepler-442b',
    description: 'Суперземля в зоне обитаемости, один из лучших кандидатов на потенциально обитаемую планету.',
    starSystemId: 5,
    discoveryDate: '2015-01-06'
  },
  {
    id: 10,
    name: 'Венера',
    description: 'Вторая планета от Солнца с экстремальным парниковым эффектом. Температура на поверхности достигает 460°C.',
    starSystemId: 1,
    discoveryDate: ''
  }
]

// Начальные данные для орбитальных позиций
const initialOrbitalPositions = [
  {
    id: 1,
    description: 'Расстояние от звезды: 1 а.е. (149.6 млн км). Эксцентриситет: 0.0167. Период обращения: 365.25 дней.',
    planetId: 1,
    availableCount: 1
  },
  {
    id: 2,
    description: 'Расстояние от звезды: 1.524 а.е. (227.9 млн км). Эксцентриситет: 0.0934. Период обращения: 687 дней.',
    planetId: 2,
    availableCount: 1
  },
  {
    id: 3,
    description: 'Расстояние от звезды: 5.203 а.е. (778.3 млн км). Эксцентриситет: 0.048. Период обращения: 4333 дня.',
    planetId: 3,
    availableCount: 1
  },
  {
    id: 4,
    description: 'Расстояние от звезды: 9.537 а.е. (1427 млн км). Эксцентриситет: 0.054. Период обращения: 10759 дней.',
    planetId: 4,
    availableCount: 1
  },
  {
    id: 5,
    description: 'Расстояние от звезды: 0.029 а.е. Эксцентриситет: < 0.01. Период обращения: 6.1 дней.',
    planetId: 5,
    availableCount: 3
  },
  {
    id: 6,
    description: 'Расстояние от звезды: 0.038 а.е. Эксцентриситет: < 0.01. Период обращения: 9.2 дней.',
    planetId: 6,
    availableCount: 2
  },
  {
    id: 7,
    description: 'Расстояние от звезды: 0.1234 а.е. Эксцентриситет: ~0.01. Период обращения: 14.4 дней.',
    planetId: 7,
    availableCount: 1
  },
  {
    id: 8,
    description: 'Расстояние от звезды: 0.049 а.е. Эксцентриситет: < 0.35. Период обращения: 11.2 дней.',
    planetId: 8,
    availableCount: 2
  },
  {
    id: 9,
    description: 'Расстояние от звезды: 0.409 а.е. Эксцентриситет: 0.04. Период обращения: 112.3 дня.',
    planetId: 9,
    availableCount: 1
  },
  {
    id: 10,
    description: 'Расстояние от звезды: 0.723 а.е. (108.2 млн км). Эксцентриситет: 0.007. Период обращения: 224.7 дней.',
    planetId: 10,
    availableCount: 1
  }
]

// Глобальное реактивное хранилище
export const store = reactive({
  starSystems: [...initialStarSystems],
  planets: [...initialPlanets],
  orbitalPositions: [...initialOrbitalPositions],

  // Генератор ID
  nextStarSystemId: initialStarSystems.length + 1,
  nextPlanetId: initialPlanets.length + 1,
  nextOrbitalPositionId: initialOrbitalPositions.length + 1,

  // ===== CRUD для звёздных систем =====
  addStarSystem(system) {
    system.id = this.nextStarSystemId++
    this.starSystems.push({ ...system })
  },

  updateStarSystem(id, data) {
    const idx = this.starSystems.findIndex(s => s.id === id)
    if (idx !== -1) {
      this.starSystems[idx] = { ...this.starSystems[idx], ...data }
    }
  },

  deleteStarSystem(id) {
    // Удаляем связанные планеты и их орбитальные позиции
    const planetIds = this.planets.filter(p => p.starSystemId === id).map(p => p.id)
    this.orbitalPositions = this.orbitalPositions.filter(op => !planetIds.includes(op.planetId))
    this.planets = this.planets.filter(p => p.starSystemId !== id)
    this.starSystems = this.starSystems.filter(s => s.id !== id)
  },

  getStarSystemById(id) {
    return this.starSystems.find(s => s.id === id)
  },

  // ===== CRUD для планет =====
  addPlanet(planet) {
    planet.id = this.nextPlanetId++
    this.planets.push({ ...planet })
  },

  updatePlanet(id, data) {
    const idx = this.planets.findIndex(p => p.id === id)
    if (idx !== -1) {
      this.planets[idx] = { ...this.planets[idx], ...data }
    }
  },

  // Удаление планеты 
  deletePlanet(id) {
    this.orbitalPositions = this.orbitalPositions.filter(op => op.planetId !== id)
    this.planets = this.planets.filter(p => p.id !== id)
  },

  getPlanetById(id) {
    return this.planets.find(p => p.id === id)
  },

  getPlanetsByStarSystem(starSystemId) {
    return this.planets.filter(p => p.starSystemId === starSystemId)
  },

  // ===== CRUD для орбитальных позиций =====
  addOrbitalPosition(position) {
    position.id = this.nextOrbitalPositionId++
    this.orbitalPositions.push({ ...position })
  },

  updateOrbitalPosition(id, data) {
    const idx = this.orbitalPositions.findIndex(op => op.id === id)
    if (idx !== -1) {
      this.orbitalPositions[idx] = { ...this.orbitalPositions[idx], ...data }
    }
  },

  deleteOrbitalPosition(id) {
    this.orbitalPositions = this.orbitalPositions.filter(op => op.id !== id)
  },

  getOrbitalPositionsByPlanet(planetId) {
    return this.orbitalPositions.filter(op => op.planetId === planetId)
  }
})
