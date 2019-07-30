<template>
  <div class="parking-lot-div">
    <Table border :columns="columns" :data="parkingBoys">
      <template slot-scope="{ row }" slot="status">
        <span>{{PublicContants.ParkingBoyStatus[row.status]}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="error" size="small" @click="freeze(index)" v-if="!(row.status === 0)">注销</Button>
        <Button type="success" size="small" style="margin-right: 5px" @click="unfreeze(index)" v-else>解冻</Button>
      </template>
    </Table>
    <Button type="error" class="new-btn" size="large">+</Button>
  </div>
</template>

<script>
import TransferLot from '../components/TransferParkingLot'
import TransferTag from '../components/TransferTag'
export default {
  components: { TransferLot, TransferTag },
  data () {
    return {
      parkingBoys: [],
      columns: [
        {
          title: '员工id',
          key: 'id'
        },
        {
          title: '员工名字',
          key: 'name'
        },
        {
          title: '员工号',
          key: 'number'
        },
        {
          title: '状态',
          slot: 'status',
          key: 'status'
        },
        {
          title: '管理标签',
          type: 'expand',
          slot: 'tag',
          key: 'tag',
          width: 100,
          render: (h, params) => {
            return h(TransferTag, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '管理停车场',
          type: 'expand',
          slot: 'parkingLot',
          key: 'parkingLot',
          width: 100,
          render: (h, params) => {
            return h(TransferLot, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ]
    }
  },
  mounted () {
    this.axios.get('/managers/' + this.$store.state.manager.id + '/parking-boys').then((response) => {
      console.log(response)
      this.$store.commit('getParkingBoys', response)
      this.parkingBoys = this.$store.state.parkingBoys
    }).catch((error) => {
      console.log(error)
    })
    this.axios.get('/managers/' + this.$store.state.manager.id + '/parking-lots').then((response) => {
      this.$store.commit('getParkingLots', response)
      console.log(JSON.stringify(response))
      this.parkingLots = this.$store.state.parkingLots
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    edit (index) {
      let parkingBoy = this.parkingBoys[index]
      parkingBoy['isEdit'] = true
      this.$set(this.parkingBoys, index, parkingBoy)
    },
    save (index) {
      let parkingBoy = this.parkingBoys[index]
      parkingBoy['isEdit'] = false
      this.$set(this.parkingBoys, index, parkingBoy)
      this.axios.put('/parking-lots/' + parkingBoy.id, parkingBoy).then((response) => {
        console.log(response.data)
      })
    },
    freeze (index) {
      this.$Modal.confirm({
        title: 'Title',
        content: '<p>你确定要注销这位哥吗?</p><p>你真的确定要注销这位哥吗?</p>',
        onOk: () => {
          this.$store.commit('freezeParkingBoy', index)
          let parkingBoy = this.parkingBoys[index]
          this.axios.put('/parking-boys/' + parkingBoy.id, parkingBoy).then((response) => {
          }).catch((error) => {
            console.log(error)
          })
          this.$Message.info('你把这位哥注销了')
        },
        onCancel: () => {
          this.$Message.info('你饶了他一命')
        }
      })
    },
    unfreeze (index) {
      this.$Modal.confirm({
        title: 'Title',
        content: '<p>你确定要解冻这位哥吗?</p><p>你真的确定要解冻这位哥吗?</p>',
        onOk: () => {
          this.$store.commit('unFreezeParkingBoy', index)
          let parkingBoy = this.parkingBoys[index]
          this.axios.put('/parking-boys/' + parkingBoy.id, parkingBoy).then((response) => {
          }).catch((error) => {
            console.log(error)
          })
          this.$Message.info('你把这位哥解冻了')
        },
        onCancel: () => {
          this.$Message.info('你为什么不放过他')
        }
      })
    }
  }
}

</script>

<style>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
