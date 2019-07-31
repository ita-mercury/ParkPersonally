<template>
  <div class="parking-lot-dashboard-div">
    <Row v-for="rowIndex in Math.ceil(parkingLots.length/3)" class="parking-lot-dashboard-div-row" v-bind:key="rowIndex">
      <Col span="7" offset="1" v-for="(parkingLot, index) in parkingLots.slice((rowIndex-1)*3,rowIndex*3)" :key="index">
        <Card class="circle-card">
          <p slot="title">{{parkingLot.name}}</p>
          <Row>
            <Col span="11">
              <p>
                <i-circle :percent="getRate(parkingLot)" >
                  <span>{{parkingLot.capacity-parkingLot.restCapacity}}/{{parkingLot.capacity}}</span>
                </i-circle>
              </p>
              <p style="text-align: center">当前停车情况</p>
            </Col>
            <Col span="11" offset="1">
              <p v-for="(parkingBoy, index) in parkingLot.parkingBoys" :key="index">停车员: {{parkingBoy.name}}</p>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      parkingLots: [],
      parkinglots: [
        {
          id: 1,
          name: 'nihao',
          capacity: 10,
          restCapacity: 10
        },
        {
          id: 2,
          name: 'nihao',
          capacity: 11,
          restCapacity: 8
        }
      ]
    }
  },
  methods: {
    getRate (parkingLot) {
      let rate = ((parkingLot.capacity - parkingLot.restCapacity) / parkingLot.capacity) * 100
      return rate
    }
  },
  mounted () {
    this.axios.get('/managers/' + this.$store.state.manager.id + '/parking-lots').then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i]['isEdit'] = false
      }
      this.$store.commit('getParkingLots', response)
      this.parkingLots = this.$store.state.parkingLots
    }).catch(() => {})
  }
}

</script>

<style>
</style>
