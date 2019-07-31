<template>
  <div class="parking-boy-div">
    <Input size="large" v-model="name" @on-change="searchParkingBoy" class="parking-boy-div-input-search" search placeholder="Search By Name..." />
    <Input size="large" v-model="number" @on-change="searchParkingBoy" class="parking-boy-div-input-search-by-number" search placeholder="Search By Number..." />
    <Select @on-change="searchParkingBoy" size="large" v-model="tags" class="parking-boy-div-select-search-by-tags" placeholder="Tags" filterable multiple >
      <Option v-for="item in AllTags" :value="item.id" :key="item.id">{{ item.feature }}</Option>
    </Select>
    <Table border :columns="columns" :data="showParkingBoys">
      <template slot-scope="{ row }" slot="status">
        <span>{{PublicConstants.ParkingBoyStatus[row.status].text}}<Icon class="status-icon" type="ios-radio-button-on" size="15" :color="PublicConstants.ParkingBoyStatus[row.status].color" /></span>
      </template>
      <template slot-scope="{ row }" slot="tag">
        <div>
          <div v-if="!row.isEdit">
            <Tag v-for="tag in row.tags" :key="tag.id" >{{tag.feature}}</Tag>
          </div>
          <div v-else>
            <Select v-model="tagsForBoy"  filterable multiple>
              <Option v-for="tag in AllTags" :value="tag.id" :key="tag.id">{{ tag.feature }}</Option>
            </Select>
          </div>
        </div>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)" v-if="!row.isEdit">修改标签</Button>
        <Button type="success" size="small" style="margin-right: 5px" @click="save(index)" v-else>保存</Button>
        <Button type="error" size="small" @click="freeze(index)" v-if="!(row.status === 0)">注销</Button>
        <Button type="success" size="small" @click="unfreeze(index)" v-else>解冻</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import TransferLot from '../../components/TransferParkingLot'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { TransferLot },
  data () {
    return {
      name: '',
      number: '',
      parkingBoys: [],
      showParkingBoys: [],
      AllTags: [],
      tags: [],
      tagsForBoy: [],
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
          key: 'status',
          filters: this.PublicConstants.SearchByParkingBoyStatus,
          filterMultiple: false,
          filterMethod (value, row) {
            return value === row.status
          }
        },
        {
          title: '管理停车场',
          type: 'expand',
          slot: 'parkingLot',
          key: 'parkingLot',
          align: 'center',
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
          title: '标签',
          slot: 'tag',
          width: 300,
          key: 'tag'
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
  mounted () {
    this.axios.get('/managers/' + this.$store.state.manager.id + '/parking-boys').then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i]['isEdit'] = false
      }
      this.parkingBoys = response.data
      this.showParkingBoys = this.parkingBoys
    }).catch(() => {})
    this.axios.get('/managers/' + this.$store.state.manager.id + '/parking-lots').then((response) => {
      this.$store.commit('getParkingLots', response)
      this.parkingLots = this.$store.state.parkingLots
    }).catch(() => {})
    this.axios.get('/tags').then((response) => {
      this.$store.commit('getTags', response)
      this.AllTags = this.$store.state.AllTags
    }).catch(() => {})
  },
  methods: {
    edit (index) {
      let parkingBoy = this.parkingBoys[index]
      parkingBoy['isEdit'] = true
      this.tagsForBoy = parkingBoy.tags.map(item => {
        return item.id
      })
      this.$set(this.parkingBoys, index, parkingBoy)
    },
    save (index) {
      this.tagsForBoy = this.tagsForBoy.map(id => {
        return { 'id': id, 'feature': this.AllTags.filter(item => item.id === id)[0].feature }
      })
      let parkingBoy = this.parkingBoys[index]
      parkingBoy.tags = this.tagsForBoy
      parkingBoy['isEdit'] = false
      this.axios.put('/managers/' + this.$store.state.manager.id + '/parking-boys/' + parkingBoy.id + '/tags', parkingBoy.tags).then((response) => {
        this.$set(this.parkingBoys, index, parkingBoy)
        this.$Message.success('修改成功')
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
            console.log(JSON.stringify(response))
          }).catch(() => {})
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
          let parkingBoy = this.parkingBoys[index]
          parkingBoy['status'] = 0
          this.axios.put('/parking-boys/' + parkingBoy.id, parkingBoy).then((response) => {
            this.$store.commit('unFreezeParkingBoy', { index: index, status: response.data.status })
          }).catch(() => {})
          this.$Message.info('你把这位哥解冻了')
        },
        onCancel: () => {
          this.$Message.info('你为什么不放过他')
        }
      })
    },
    searchParkingBoy () {
      this.showParkingBoys = []
      for (let i = 0; i < this.parkingBoys.length; i++) {
        let parkingBoy = this.parkingBoys[i]
        if (parkingBoy['name'].indexOf(this.name) > -1 && parkingBoy['number'].indexOf(this.number) > -1 && (parkingBoy.tags.length > 0 ? parkingBoy.tags.filter(tag => this.tags.length > 0 ? this.tags.indexOf(tag.id) > -1 : true).length > 0 : this.tags.length === 0)) {
          this.showParkingBoys.push(parkingBoy)
        }
      }
    }
  }
}

</script>

<style>
</style>
