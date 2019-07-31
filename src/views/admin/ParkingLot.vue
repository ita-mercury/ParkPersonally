<template>
  <div class="parking-lot-div">
<!--    <Input size="large" class="parking-lot-div-input-search" :bind="searchWord"  search enter-button placeholder="Search By Name..." />-->
    <Table  border :columns="columns" :data="parkingLots">
      <template slot-scope="{ row }" slot="id">
        <strong>{{ row.id }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="name">
        <Input  v-model="parkingLots[index].name" v-if="row.isEdit"/>
        <span v-else>{{row.name}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="capacity">
        <InputNumber :min="0" class="input-number" :max="1000" v-model="parkingLots[index].capacity" v-if="row.isEdit"/>
        <span v-else>{{row.capacity}}</span>
      </template>
      <template slot-scope="{ row }" slot="status">
        <span>{{PublicConstants.ParkingLotStatus[row.status]}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)" v-if="!row.isEdit">修改</Button>
        <Button type="success" size="small" style="margin-right: 5px" @click="save(index)" v-else>保存</Button>
        <Button type="error" size="small" @click="freeze(index)" v-if="!(row.status === 0)">注销</Button>
        <Button type="success" size="small" style="margin-right: 5px" @click="unfreeze(index)" v-else>解冻</Button>
      </template>
    </Table>
    <div class="page-div">
      <Page :total="100" />
      <Button type="error" class="new-btn" size="large" @click="modal=true">+</Button>
      <Modal
        title="添加停车场"
        v-model="modal"
        class-name="vertical-center-modal"
        @on-ok="createParkingLot"
      >
        <Form :model="parkingLot" label-position="left" :label-width="100">
          <FormItem label="停车场名字">
            <Input v-model="parkingLot.name" icon="ios-car"  style="width: 200px" />
          </FormItem>
          <FormItem label="容量">
            <Input v-model="parkingLot.capacity" icon="md-car"  style="width: 200px" />
          </FormItem>
        </Form>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchWord: '',
      parkingLots: [],
      parkingLot: {
        name: '',
        capacity: ''
      },
      modal: false,
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
          title: '状态',
          slot: 'status',
          key: 'status'
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
      this.axios.put('/parking-lots/' + parkingLot.id, parkingLot).then((response) => {
      })
    },
    freeze (index) {
      this.$Modal.confirm({
        title: '注销停车场',
        content: '<p>你确定要注销这个停车场吗?</p><p>你真的确定要注销这个停车场吗?</p>',
        onOk: () => {
          let parkingLot = JSON.parse(JSON.stringify(this.parkingLots[index]))
          parkingLot['status'] = 0
          this.axios.patch('/parking-lots/' + parkingLot.id, parkingLot).then((response) => {
            console.log(JSON.stringify(response.data))
            this.parkingLots[index]['status'] = 0
            this.$Message.success('你把这个停车场注销了')
          }).catch((error) => {
            this.$Message.error('注销停车场失败！' + error.response.data.message)
          })
        },
        onCancel: () => {
          this.$Message.info('你饶了它一命')
        }
      })
    },
    unfreeze (index) {
      this.$Modal.confirm({
        title: '解冻停车场',
        content: '<p>你确定要解冻这个停车场吗?</p><p>你真的确定要解冻这个停车场吗?</p>',
        onOk: () => {
          let parkingLot = JSON.parse(JSON.stringify(this.parkingLots[index]))
          parkingLot['status'] = 0
          this.axios.patch('/parking-lots/' + parkingLot.id, parkingLot).then((response) => {
            console.log(JSON.stringify(response.data))
            this.parkingLots[index]['status'] = 1
            this.$Message.success('你把这个停车场解冻了')
          }).catch((error) => {
            this.$Message.error('解冻停车场失败！' + error.response.data.message)
          })
        },
        onCancel: () => {
          this.$Message.info('你为什么不放过它')
        }
      })
    },
    search () {
      this.parkingLots = this.parkingLots.filter(item => {
        item.name.indexOf(this.searchWord, 0)
      })
    },
    createParkingLot () {
      this.axios.post('parking-lots', this.parkingLot).then((response) => {
        this.parkingLots.push(response.data)
        this.$Modal.success('创建成功')
      }).catch(() => {})
    }
  },
  mounted () {
    this.axios.get('/parking-lots').then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i]['isEdit'] = false
      }
      this.parkingLots = response.data
    }).catch(() => {})
  }
}
</script>
