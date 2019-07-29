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
                    ></Transfer></Col>
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
      targetKeys: this.getTargetKeys(),
      title: ['可选停车场', '已有停车场'],
      parkingLotOfManager: this.$store.state.parkingLotOfManager
    }
  },
  methods: {
    getParkingLotData () {
      // let allLotFormat = []
      // this.parkingLotOfManager.map(item => {
      // })
      let allParkingLot = [
        { 'key': '1', 'label': 'lot1' },
        { 'key': '2', 'label': 'lot2' },
        { 'key': '3', 'label': 'lot3' }
      ]
      return allParkingLot
    },
    getTargetKeys () {
      // return this.$store.state.parkingBoys[]
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
