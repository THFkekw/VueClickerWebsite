<script setup lang="ts">

console.log("Clicker script")
import { compile, computed, ref } from 'vue'
import globalProperties from '@/main'

console.log(typeof globalProperties)



const workerOutputBase = 0.5
const machineOutputBase = 5
const factoryOutputBase = 100
const workerOutputMultiplier = ref(1)
const machineOutputMultiplier = ref(1)
const factoryOutputMultiplier = ref(1)


const woodPerBuy = ref(100)
const woodCostKg = ref(2.5)
const woodCost = computed(() => woodPerBuy.value*woodCostKg.value)

const minPrice = 1


const workerCostBase = 150
const machineCostBase = 5000
const factoryCostBase = 100000

const workerOutput = computed(() => (globalProperties.workerAmount.value * workerOutputBase * workerOutputMultiplier.value))
const workerCost = computed(() => Math.trunc(workerCostBase * (1.01 ** globalProperties.workerAmount.value)) )
const machineOutput = computed(() => globalProperties.machineAmount.value * machineOutputBase * machineOutputMultiplier.value)
const machineCost = computed(() => Math.trunc(machineCostBase * (1.1 ** globalProperties.machineAmount.value)))
const factoryOutput = computed(() => globalProperties.factoryAmount.value * factoryOutputBase * factoryOutputMultiplier.value)
const factoryCost = computed(() => Math.trunc(factoryCostBase * (1.3 ** globalProperties.factoryAmount.value)))
const totalOutput = computed(() => (factoryOutput.value + machineOutput.value + workerOutput.value))

const demandBase = ref(5)
const demand = computed(() => demandBase.value*(globalProperties.marketingLevel.value+1)/globalProperties.schlaegerPreis.value)
const demandUpgrades = ref(0)
const upgradeDemandCost = computed(() => 200 * (2 ** globalProperties.marketingLevel.value))

const oldDate = ref(Date.now())
const timeDelta = ref(0)

const lastSaveDate = ref(Date.now())
const lastSaveDelta = ref(0)

const fractionalAmount = ref<number>(0)

function saveGame () {
  localStorage.setItem('saveFile',JSON.stringify(globalProperties))

}

saveGame()
if (false) {
  loadGame()
}
function loadGame () {
  const oldGlobalProperties = JSON.parse(localStorage.getItem('saveFile'))
  console.log(typeof oldGlobalProperties)
  console.log(oldGlobalProperties)
  console.log(globalProperties)
  for (const [key, value] of Object.entries(oldGlobalProperties)){
    globalProperties[key].value = value.value
  }


}

function buy (id:string) {
  switch (id) {
    case "arbeiter":{
      if (globalProperties.moneyAmount.value>workerCost.value){
        globalProperties.moneyAmount.value -=workerCost.value
          globalProperties.workerAmount.value += 1
      }
      break;
    }
    case "maschine":{
      if (globalProperties.moneyAmount.value>machineCost.value){
        globalProperties.moneyAmount.value -=machineCost.value
          globalProperties.machineAmount.value += 1
      }
      break;
    }
    case "fabrik":{
      if (globalProperties.moneyAmount.value > factoryCost.value) {
        globalProperties.moneyAmount.value -= factoryCost.value
          globalProperties.factoryAmount.value += 1
      }
      break;
    }
    case "holz":
      if (globalProperties.moneyAmount.value > woodCost.value ) {
        globalProperties.moneyAmount.value -= woodCost.value
          globalProperties.woodAmount.value += Number(woodPerBuy.value)
      }
      break;
  }
}
function upgradeDemand () {
  if (globalProperties.moneyAmount.value > upgradeDemandCost.value) {
    globalProperties.moneyAmount.value -=upgradeDemandCost.value
    globalProperties.marketingLevel.value += 1

  }
}
function addSchlaeger (amount:number) {
  if ((globalProperties.woodAmount.value-amount)>=0) {
    globalProperties.totalAmount.value += amount
    globalProperties.currentAmount.value += amount
    globalProperties.woodAmount.value -= amount
  }
}
function changePrice (amount:number) {
  globalProperties.schlaegerPreis.value += amount
  if (globalProperties.schlaegerPreis.value < minPrice) {
    globalProperties.schlaegerPreis.value = minPrice
  }
}
function mainLoop () {
  console.log(typeof lastSaveDelta.value)
  console.log(lastSaveDelta.value)
  addSchlaeger((totalOutput.value*lastSaveDelta.value))
  lastSaveDateFunc()
  sellSchlaeger((totalOutput.value + 1)*lastSaveDelta.value)
}
function sellSchlaeger (amount:number) {
  const originalAmount = amount
  amount = Math.floor(amount)
  fractionalAmount.value += originalAmount - amount
  if(fractionalAmount.value >= 1) {
    amount += 1
    fractionalAmount.value -= 1
  }
  if (globalProperties.currentAmount.value>=amount) {
    globalProperties.currentAmount.value -= amount
    globalProperties.moneyAmount.value += (amount*globalProperties.schlaegerPreis.value)
  }
}
function timedelta () {
  timeDelta.value = (Date.now()-oldDate.value)/1000
  oldDate.value = Date.now()
}
function lastSaveDateFunc () {
  lastSaveDelta.value = (Date.now()-lastSaveDate.value)/1000
  lastSaveDate.value = Date.now()
}
setInterval(mainLoop,250)
</script>

<template>
  <keep-alive>
    <div class="div">
      <h1>Schläger Clicker</h1>
      <hr>
      <br>
      <div class="gameLayout">
        <div class="produktion">
          <h3 class="smooth_number">Anzahl Schläger produziert : {{Math.floor(globalProperties.totalAmount.value)}}</h3>
          <h3 class="smooth_number">Momentane Anzahl Schläger : {{Math.floor(globalProperties.currentAmount.value)}}</h3>
          <h3>Schläger pro Sekunde: {{totalOutput}}</h3>
          <hr>
          <br>
          <div>
            <button class="button" @click="addSchlaeger(1)">Schläger Herstellen</button>
          </div>
          <br>
          <hr>
          <div>
            <button @click="buy('arbeiter')">Arbeiter anstellen</button>
            <p>Arbeiter Kosten:{{workerCost}}</p>
          </div>
          <div>
            <p>Anzahl Arbeiter: {{globalProperties.workerAmount.value}}</p>
          </div>
          <br>
          <div>
            <button @click="buy('maschine')">Maschine Kaufen</button>
            <p>Maschine Kosten:{{machineCost}}</p>
          </div>
          <div>
            <p>Anzahl Maschienen: {{globalProperties.machineAmount.value}}</p>
          </div>
          <br>
          <div>
            <button @click="buy('fabrik')">Fabriken Kaufen</button>
            <p>Fabrik Kosten:{{factoryCost}}</p>
          </div>
          <div>
            <p>Anzahl Fabriken: {{globalProperties.factoryAmount.value}}</p>
          </div>

        </div>
        <div class="produktion">
          <h2>Marketing</h2>
          <div>
            <p>Geld: $ {{globalProperties.moneyAmount.value}}</p>
          </div>
          <hr>
          <div>
            <p>Schläger Preis: $ {{schlaegerPreis}}</p>
            <p>Bedarf: {{demand}}</p>
            <div>
              <button @click="changePrice(1)">Preis Erhöhen</button>
              <button @click="changePrice(-1)">Preis Verringern</button>
            </div>
            <button @click="upgradeDemand">Marketing verbessern. Kosten: {{upgradeDemandCost}}</button>
            <p>Marketing Level: {{globalProperties.marketingLevel.value + 1}}</p>
          </div>
        </div>

        <div>
          <h2>Material</h2>
          <div>
            <p>Holz: {{Math.trunc(globalProperties.woodAmount.value)}} Kg</p>
            <button @click="buy('holz')">Holz kaufen</button>
            <p>Kosten: {{woodCost}}</p>
            <P>Kaufmenge: {{woodPerBuy}}</P>
            <P>Erwünschte Kaufmenge:</P>
            <input v-model="woodPerBuy" placeholder="Kaufmenge einstellen">
          </div>
        </div>

      </div>
    </div>
  </keep-alive>
</template>

<style scoped>
.div {
  width: 100%;
  height: 100%;
}
.gameLayout {
  display: flex;
}
.button {
  width:15vw;
  height: auto;
  font-size: 2em;
}
.produktion {
  //padding-right: 4vw;
  margin-right: 1vw;
  width: 30vw;
  align-content: center;
}
.smooth_number {
  transition-delay: 0.2s;
}

</style>