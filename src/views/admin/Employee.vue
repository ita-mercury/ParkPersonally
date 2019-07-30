<template>
  <div class="employee-div">
    <div class="employee-div-operation-div">
      <Select v-model="currentRole.key" @on-change="changeRole">
        <Option v-for="role in roleList" :value="role.key" :key="role.key">{{ role.role }}</Option>
      </Select>
    </div>
    <Table border :columns="columns" :data="parkingBoys">
      <template slot-scope="{ row, index }" slot="name">
        <Input v-model="parkingBoys[index].name" v-if="row.isEdit"/>
        <span v-else>{{row.name}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="number">
        <Input v-model="parkingBoys[index].number" v-if="row.isEdit"/>
        <span v-else>{{row.number}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="phone">
        <Input v-model="parkingBoys[index].phone" v-if="row.isEdit"/>
        <span v-else>{{row.phone}}</span>
      </template>
      <template slot-scope="{ row }" slot="status">
        <span>{{PublicConstants.ParkingBoyStatus[row.status]}}</span>
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
      parkingBoys: [],
      currentRole: { key: 1, role: '停车员' },
      roleList: [{ key: 1, role: '停车员' }, { key: 2, role: '经理' }],
      columns: [
        {
          title: '员工id',
          key: 'id'
        },
        {
          title: '员工名字',
          slot: 'name',
          key: 'name'
        },
        {
          title: '员工号',
          slot: 'number',
          key: 'number'
        },
        {
          title: '员工电话',
          slot: 'phone',
          key: 'phone'
        },
        {
          title: '状态',
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
      this.axios.put('/admin/parking-boys/' + parkingBoy.id, parkingBoy).then((response) => {
        this.$set(this.parkingBoys, index, parkingBoy)
        this.$Modal.success({
          title: '修改成功'
        })
      })
    },
    changeRole (role) {
      if (role === 1) {
        this.axios.get('parking-boys').then((response) => {
          this.parkingBoys = response.data
        })
      } else if (role === 2) {
        this.axios.get('managers').then((response) => {
          this.parkingBoys = response.data
        })
      }
    },
    freeze (index) {
      this.$Modal.confirm({
        title: '冻结',
        content: '<p>你确定要注销这位哥吗?</p><p>你真的确定要注销这位哥吗?</p>',
        onOk: () => {
          let parkingBoy = this.parkingBoys[index]
          parkingBoy['status'] = 0
          this.axios.put('/parking-boys/' + parkingBoy.id, parkingBoy).then((response) => {
            this.parkingBoys[index]['status'] = 0
            this.$Message.info('你把这位哥注销了')
          }).catch(() => {})
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
            this.parkingBoys[index]['status'] = response.data.status
            this.$Message.info('你把这位哥解冻了')
          }).catch(() => {})
        },
        onCancel: () => {
          this.$Message.info('你为什么不放过他')
        }
      })
    }
  },
  mounted () {
    this.axios.get('parking-boys').then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i]['isEdit'] = false
      }
      this.parkingBoys = response.data
    })
  }
}

</script>

<style>
</style>
