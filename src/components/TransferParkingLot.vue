<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand">
            <Col>
            <Transfer :data="parkingLotData"
                      :titles="title"
                      :target-keys="targetKeys"
                      filterable
                      :filter-method="filterMethod"
                      @on-change="handleChange1"
                    ></Transfer>< /Col>
        </Row>
    </div>
</template>
<script>
export default {
  props: {
    parkingBoy: Object
  },
  data () {
    return {
      parkingLotData: this.getParkingLotData(),
      // tagData:this.getTagData(),
      targetKeys: this.getTargetKeys(),
      // tagTargetKeys:this.getTagTargetKeys(),
      title: ['可选停车场', '已有停车场'],
      // title1:['可选tag','已有tag'],
      manager: this.$store.state.manager
    }
  },
  methods: {
    getParkingLotData () {
      // return manager.parkingLots.map(item => {
      //     return {"key":item.parkingLotId,"label":item.parkingLotName}
      // })
      let allParkingLot = [
        { 'key': '1', 'label': 'lot1' },
        { 'key': '2', 'label': 'lot2' },
        { 'key': '3', 'label': 'lot3' }
      ]
      return allParkingLot
    },
    // getTagData () {
    //     // return manager.parkingLots.map(item => {
    //     //     return {"key":item.parkingLotId,"label":item.parkingLotName}
    //     // })
    //     let allParkingLot=[
    //         {"key":"1","label":"会唱"},
    //         {"key":"2","label":"会跳"},
    //         {"key":"3","label":"会rap"},
    //         {"key":"4","label":"会篮球"},
    //     ]
    //     return allParkingLot;
    // },
    getTargetKeys () {
      // return this.$store.state.parkingBoys[row]
      //      .parkingLots.map(item => {
      //     return item.parkingLotId
      // })
      return ['1']
    },
    // getTagTargetKeys () {

    //     return ["1"]
    // },
    handleChange1 (newTargetKeys) {
      // this.$store.dipatch('addLotToParkingBoy',newTargetKeys)
      this.targetKeys = newTargetKeys// []
    },
    // handleChange2 (newTargetKeys) {
    //     // this.$store.dipatch('addLotToParkingBoy',newTargetKeys)
    //     this.tagTargetKeys = newTargetKeys;//[]
    // },
    filterMethod (data, query) {
      return data.label.indexOf(query) > -1
    }
  }
}
</script>
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
