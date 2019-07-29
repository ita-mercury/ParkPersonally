<template>
  <div class="parking-lot-div">
<!--    <Input size="large" class="parking-lot-div-input-search" :bind="searchWord"  search enter-button placeholder="Search By Name..." />-->

    <Table  border :columns="columns" :data="parkingLotsOfManager">
      <template slot-scope="{ row }" slot="id">
        <strong>{{ row.id }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="name">
        <Input size="" v-model="parkingLotsOfManager[index].name" v-if="row.isEdit"/>
        <span v-else>{{row.name}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="capacity">
        <InputNumber min="0" class="input-number" max="1000" v-model="parkingLotsOfManager[index].capacity" v-if="row.isEdit"/>
        <span v-else>{{row.capacity}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)" v-if="!row.isEdit">修改</Button>
        <Button type="success" size="small" style="margin-right: 5px" @click="save(index)" v-else>保存</Button>
        <Button type="error" size="small" @click="remove(index)">注销</Button>
      </template>
    </Table>
<!--    class="page-div">-->
<!--    <Page :total="100" />-->
<!--  </div>-->
<!--  <Button type="error" class="new-btn" size="large">+</Button><div-->
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchWord: '',
      parkingLotsOfManager: [],
      manager: this.$store.state.manager,
      columns: [
        {
          title: 'id',
          slot: 'id'
        },
        {
          title: '名字',
          slot: 'name',
          key: 'name'
        },
        {
          title: '总容量',
          slot: 'capacity',
          key: 'capacity',
          sortable: true
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ]
    }
  },
  methods: {
    edit (index) {
      let parkingLot = this.parkingLots[index]
      parkingLot['isEdit'] = true
      this.$set(this.parkingLots, index, parkingLot)
    },
    save (index) {
      let parkingLot = this.parkingLots[index]
      parkingLot['isEdit'] = false
      this.$set(this.parkingLots, index, parkingLot)
      // this.axios.put('/parking-lots/' + parkingLot.id, parkingLot).then((response) => {
      //   AlertModule.show({
      //     title: '您好',
      //     content: '修改完成',
      //     onShow () {
      //       // console.log('Module: I\'m showing')
      //     },
      //     onHide () {
      //       // console.log('Module: I\'m hiding now')
      //       // self.$router.push({name: 'order'})
      //     }
      //   })
      //   console.log(JSON.stringify(response.data))
      // })
    },
    remove (index) {
      this.parkingLots.splice(index, 1)
    },
    search () {
      this.parkingLots = this.parkingLots.filter(item => {
        item.name.indexOf(this.searchWord, 0)
      })
    }
  },
  mounted () {
    this.axios.get('/manager/' + this.manager.id + '/parking-lots').then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i]['isEdit'] = false
      }
      this.$store.commit('getParkingLots', response)
      console.log('-------------')
      console.log(JSON.stringify(this.$store.state.parkingLots))
      console.log('-------------')
      this.parkingLotsOfManager = this.$store.state.parkingLots
    }).catch((error) => {
      console.log(error)
    })
  }

}
</script>
