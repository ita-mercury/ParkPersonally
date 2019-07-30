
<template>
  <div class="parking-lot-div">
    <Table border :columns="columns" :data="data">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="modify(index)">修改</Button>
        <Button type="error" size="small" @click="frozen(index)">注销</Button>
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
      columns: [
        {
          title: '员工id',
          key: 'id'
        },
        {
          title: '员工名字',
          key: 'parkingBoyName'
        },
        {
          title: '员工号',
          key: 'parkingBoyNumber'
        },
        {
          title: '管理标签',
          type: 'expand',
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
          title: '员工标签',
          key: 'tags'
        },
        {
          title: '管理停车场',
          type: 'expand',
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
      ],
      data: this.$store.state.parkingBoyOfManager
    }
  },
  mounted () {
    this.$store.dispatch('initParkingBoy', this.$store.state.manager.id)
  },
  methods: {
    modify (index) {
      // this.$store.dispatch('')
    },
    delete (index) {
      // this.$store.dispatch('')
    }
  }
}

</script>

<style>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
