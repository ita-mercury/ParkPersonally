<template>
  <div class="parking-lot-div">
    <Input size="large" class="parking-lot-div-input-search" search enter-button placeholder="Search By Name..." />
    <Table border :columns="columns" :data="parkingLots">
      <template slot-scope="{ row }" slot="id">
        <strong>{{ row.id }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="name">
        <Input size="" v-model="parkingLots[index].name" v-if="row.isEdit"/>
        <span v-else>{{row.name}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="capacity">
        <InputNumber min="0" class="input-number" max="1000" v-model="parkingLots[index].capacity" v-if="row.isEdit"/>
        <span v-else>{{row.capacity}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)" v-if="!row.isEdit">修改</Button>
        <Button type="success" size="small" style="margin-right: 5px" @click="save(index)" v-else>保存</Button>
        <Button type="error" size="small" @click="remove(index)">注销</Button>
      </template>
    </Table>
    <div class="page-div">
      <Page :total="100" />
    </div>
    <Button type="error" class="new-btn" size="large">+</Button>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
      ],
      parkingLots: [
        {
          id: 1,
          name: 'John Brown',
          capacity: 18
        },
        {
          id: 2,
          name: 'Jim Green',
          capacity: 24
        },
        {
          id: 3,
          name: 'Joe Black',
          capacity: 30
        },
        {
          id: 4,
          name: 'Jon Snow',
          capacity: 26
        },
        {
          id: 5,
          name: 'Jon Snow',
          capacity: 26
        },
        {
          id: 6,
          name: 'Jon Snow',
          capacity: 26
        },
        {
          id: 7,
          name: 'Jon Snow',
          capacity: 26
        },
        {
          id: 8,
          name: 'Jon Snow',
          capacity: 26
        },
        {
          id: 9,
          name: 'Jon Snow',
          capacity: 26
        },
        {
          id: 10,
          name: 'Jon Snow',
          capacity: 26
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
    },
    remove (index) {
      this.parkingLots.splice(index, 1)
    }
  },
  mounted () {
    for (let i = 0; i < this.parkingLots.length; i++) {
      this.parkingLots[i]['isEdit'] = false
    }
  }
}
</script>
