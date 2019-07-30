<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>

<template>
    <div class="transfer-lot-div">
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
    row: Object
  },
  data () {
    return {
      parkingLotData: this.getParkingLotData(),
      targetKeys: this.getTargetKeys(),
      title: ['可选停车场', '已有停车场'],
      parkingLots: []
    }
  },
  methods: {
    getParkingLotData () {
      this.parkingLots = this.$store.state.parkingLots
      let allLotsFormat = []
      this.parkingLots.forEach(item => {
        let lotsFormat = {}
        lotsFormat.key = item.id
        lotsFormat.label = item.name + ' (' + item.restCapacity + ')'
        allLotsFormat.push(lotsFormat)
      })

      return allLotsFormat
    },
    getTargetKeys () {
      let targetKey = []
      this.row.parkingLots.forEach(item => {
        targetKey.push(item.id)
      })
      return targetKey
    },
    handleChange1 (newTargetKeys) {
      this.parkingLots = this.$store.state.parkingLots
      this.targetKeys = newTargetKeys
      console.log(newTargetKeys)
      let parkingLots = []
      newTargetKeys.forEach(item => {
        let parkinglot = {}
        parkinglot.id = item
        parkingLots.push(parkinglot)
      })
      console.log(parkingLots)
      this.axios.put('/managers/' + this.$store.state.manager.id + '/parking-boys/' + this.row.id + '/parking-lots', parkingLots).then((response) => {
        this.$Message.success('分配成功')
      }).catch(() => {})
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
