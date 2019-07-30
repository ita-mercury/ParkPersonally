<template>
  <div class="employee-div">
    <Table border :columns="columns" :data="parkingBoys">
      <template slot-scope="{ row }" slot="status">
        <span></span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)" v-if="!row.isEdit">修改</Button>
        <Button type="success" size="small" style="margin-right: 5px" @click="save(index)" v-else>保存</Button>
        <Button type="error" size="small" @click="freeze(index)" v-if="!(row.status === 0)">注销</Button>
        <Button type="success" size="small" style="margin-right: 5px" @click="unfreeze(index)" v-else>解冻</Button>
      </template>
    </Table>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
          title: '员工电话',
          slot: 'status',
          key: 'status'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ]
    }
  }
}

</script>

<style>
</style>
