<template>
  <div class="parking-lot-div">
    <Input size="large" class="parking-lot-div-input-search" search enter-button placeholder="Search By Name..." />
    <Table border :columns="columns" :data="parkingLots">
      <template slot-scope="{ row }" slot="id">
        <strong>{{ row.id }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">修改</Button>
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
          key: 'name'
        },
        {
          title: '大小',
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
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    },
    remove (index) {
      this.data6.splice(index, 1)
    }
  }
}
</script>
