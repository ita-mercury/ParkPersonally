<template>
    <div>
        <Row class="expand-row">
            <Col>
            <Transfer :titles="title"
                      :data="tagData"
                      :target-keys="tagTargetKeys"
                      filterable
                      :filter-method="filterMethod"
                      @on-change="handleChange"></Transfer></Col>
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
      tagData: this.getTagData(),
      tagTargetKeys: this.getTagTargetKeys(),
      title: ['可选tag', '已有tag'],
      manager: this.$store.state.manager
    }
  },
  methods: {
    getTagData () {
      // return manager.parkingLots.map(item => {
      //     return {"key":item.parkingLotId,"label":item.parkingLotName}
      // })
      let allTag = [
        { 'key': '1', 'label': '会唱' },
        { 'key': '2', 'label': '会跳' },
        { 'key': '3', 'label': '会rap' },
        { 'key': '4', 'label': '会篮球' }
      ]
      return allTag
    },
    getTagTargetKeys () {
      return ['1']
    },
    handleChange (newTargetKeys) {
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
