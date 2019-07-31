<template>
  <div class="employee-div">
    <div class="employee-div-operation-div">
      <Select v-model="currentRole.key" @on-change="changeRole">
        <Option v-for="role in roleList" :value="role.key" :key="role.key">{{ role.role }}</Option>
      </Select>
    </div>
    <Table border :columns="columns" :data="employees">
      <template slot-scope="{ row, index }" slot="name">
        <Input v-model="employees[index].name" v-if="row.isEdit"/>
        <span v-else>{{row.name}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="number">
        <Input v-model="employees[index].number" v-if="row.isEdit"/>
        <span v-else>{{row.number}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="phone">
        <Input v-model="employees[index].phone" v-if="row.isEdit"/>
        <span v-else>{{row.phone}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="edit(index)" v-if="!row.isEdit">修改</Button>
        <Button type="success" size="small" style="margin-right: 5px" @click="save(index)" v-else>保存</Button>
        <Button type="error" size="small" @click="freeze(index)" v-if="!(row.status === 0)">注销</Button>
        <Button type="success" size="small" style="margin-right: 5px" @click="unfreeze(index)" v-else>解冻</Button>
      </template>
    </Table>
    <Button type="error" class="new-btn" size="large" @click="currentRole.key===1?parkingBoyModal=true:managerModal=true">+</Button>
    <Modal
      title="添加停车员"
      v-model="parkingBoyModal"
      class-name="vertical-center-modal"
      @on-ok="createParkingBoy"
    >
      <Form :model="parkingBoy" label-position="left" :label-width="100">
        <FormItem label="停车员名字">
          <Input v-model="parkingBoy.name" icon="ios-car"  style="width: 200px" />
        </FormItem>
        <FormItem label="停车员工号">
          <Input v-model="parkingBoy.number" icon="md-car"  style="width: 200px" />
        </FormItem>
        <FormItem label="停车员手机号">
          <Input v-model="parkingBoy.phone" icon="md-car"  style="width: 200px" />
        </FormItem>
      </Form>
    </Modal>
    <Modal
      title="添加经理"
      v-model="managerModal"
      class-name="vertical-center-modal"
      @on-ok="createManager"
    >
      <Form :model="manager" label-position="left" :label-width="100">
        <FormItem label="经理名字">
          <Input v-model="manager.name" icon="ios-car"  style="width: 200px" />
        </FormItem>
        <FormItem label="经理工号">
          <Input v-model="manager.number" icon="md-car"  style="width: 200px" />
        </FormItem>
        <FormItem label="经理手机号">
          <Input v-model="manager.phone" icon="md-car"  style="width: 200px" />
        </FormItem>
        <FormItem label="可管理停车场">
          <Select v-model="parkingLotsIdArr" filterable multiple>
            <Option v-for="parkingLot in parkingLots" :value="parkingLot.id" :key="parkingLot.id">{{ parkingLot.name }} ({{parkingLot.capacity}})</Option>
          </Select>
        </FormItem>
        <FormItem label="可管理停车员">
          <Select v-model="parkingBoysIdArr" filterable multiple>
            <Option v-for="parkingBoy in parkingBoys" :value="parkingBoy.id" :key="parkingBoy.id">{{ parkingBoy.name }} ({{parkingBoy.number}})</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      title="修改经理信息"
      v-model="updateModal"
      class-name="vertical-center-modal"
      @on-ok="updateManager"
    >
      <Form :model="updatingManager" label-position="left" :label-width="100">
        <FormItem label="经理名字">
          <Input v-model="updatingManager.name" icon="ios-car"  style="width: 200px" />
        </FormItem>
        <FormItem label="经理工号">
          <Input v-model="updatingManager.number" icon="md-car"  style="width: 200px" />
        </FormItem>
        <FormItem label="经理手机号">
          <Input v-model="updatingManager.phone" icon="md-car"  style="width: 200px" />
        </FormItem>
        <FormItem label="可管理停车场">
          <Select v-model="updateParkingLotsIdArr" filterable multiple>
            <Option v-for="parkingLot in updateParkingLots" :value="parkingLot.id" :key="parkingLot.id">{{ parkingLot.name }} ({{parkingLot.capacity}})</Option>
          </Select>
        </FormItem>
        <FormItem label="可管理停车员">
          <Select v-model="updateParkingBoysIdArr" filterable multiple>
            <Option v-for="parkingBoy in updateParkingBoys" :value="parkingBoy.id" :key="parkingBoy.id">{{ parkingBoy.name }} ({{parkingBoy.number}})</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      employees: [],
      parkingBoys: [],
      updateParkingBoys: [],
      managers: [],
      parkingLots: [],
      updateParkingLots: [],
      parkingLotsIdArr: [],
      parkingBoysIdArr: [],
      updateParkingLotsIdArr: [],
      updateParkingBoysIdArr: [],
      currentRole: { key: 1, role: '停车员' },
      roleList: [{ key: 1, role: '停车员' }, { key: 2, role: '经理' }],
      managerModal: false,
      parkingBoyModal: false,
      updateModal: false,
      parkingBoy: {
        name: '',
        number: '',
        phone: ''
      },
      manager: {
        name: '',
        number: '',
        phone: '',
        parkingLots: [],
        parkingBoys: []
      },
      updatingManager: {
        name: '',
        number: '',
        phone: '',
        parkingLots: [],
        parkingBoys: []
      },
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
      this.axios.get('/admin/managers/unmatchedParkingBoys').then((response) => {
        this.updateParkingBoys = response.data
      })
      this.axios.get('/admin/managers/unmatchedParkingLots').then((response) => {
        this.updateParkingLots = response.data
      })
      let employee = this.employees[index]
      if (this.currentRole.key === 1) {
        employee['isEdit'] = true
      } else {
        this.updateModal = true
        this.updatingManager = employee
        this.axios.get('/managers/' + employee.id + '/parking-lots').then((response) => {
          this.updateParkingLots.push(...response.data)
          this.updateParkingLotsIdArr = response.data.map(item => {
            return item.id
          })
        }).catch(() => {})
        this.axios.get('/managers/' + employee.id + '/parking-boys').then((response) => {
          this.updateParkingBoys.push(...response.data)
          this.updateParkingBoysIdArr = response.data.map(item => {
            return item.id
          })
        }).catch(() => {})
      }
      this.$set(this.employees, index, employee)
    },
    save (index) {
      let employee = this.employees[index]
      employee['isEdit'] = false
      if (this.currentRole.key === 1) {
        this.axios.put('/admin/parking-boys/' + employee.id, employee).then((response) => {
          this.$set(this.employees, index, employee)
          this.$Modal.success({
            title: '修改成功'
          })
        }).catch(() => {})
      } else {
        this.axios.put('/admin/managers/' + employee.id, employee).then((response) => {
          this.$set(this.employees, index, employee)
          this.$Modal.success({
            title: '修改成功'
          })
        }).catch(() => {})
      }
    },
    changeRole (role) {
      if (role === 1) {
        this.axios.get('parking-boys').then((response) => {
          this.employees = response.data
        })
      } else if (role === 2) {
        this.axios.get('managers').then((response) => {
          this.employees = response.data
        })
      }
    },
    freeze (index) {
      let employee = this.employees[index]
      console.log(employee)
      this.$Modal.confirm({
        title: '冻结',
        content: '<p>你确定要注销这位哥吗?</p><p>你真的确定要注销这位哥吗?</p>',
        onOk: () => {
          this.axios.put((this.currentRole.key === 1 ? '/parking-boys/' : '/managers/') + employee.id, employee).then((response) => {
            this.employees[index]['status'] = 0
            employee['status'] = 0
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
          let employee = this.employees[index]
          employee['status'] = 0
          this.axios.put((this.currentRole.key === 1 ? '/parking-boys/' : '/managers/') + employee.id, employee).then((response) => {
            this.employees[index]['status'] = response.data.status
            this.$Message.info('你把这位哥解冻了')
          }).catch(() => {})
        },
        onCancel: () => {
          this.$Message.info('你为什么不放过他')
        }
      })
    },
    createManager () {
      this.updatingManager.parkingBoys = this.parkingBoysIdArr.map(id => {
        return { id: id }
      })
      this.parkingBoys = this.parkingBoys.filter(item => {
        return !(this.parkingBoysIdArr.indexOf(item.id) > -1)
      })
      this.updatingManager.parkingLots = this.parkingLotsIdArr.map(id => {
        return { id: id }
      })
      this.parkingLots = this.parkingLots.filter(item => {
        return !(this.parkingLotsIdArr.indexOf(item.id) > -1)
      })
      this.axios.post('managers', this.updatingManager).then((response) => {
        this.$Message.success('创建成功')
      })
    },
    createParkingBoy () {
      this.axios.post('parking-boys', this.parkingBoy).then((response) => {
        this.employees.push(response.data)
        this.$Message.success('创建成功')
      })
    },
    updateManager () {
      this.updatingManager.parkingBoys = this.updateParkingBoysIdArr.map(id => {
        return { id: id }
      })
      this.updatingManager.parkingLots = this.updateParkingLotsIdArr.map(id => {
        return { id: id }
      })
      this.axios.put('/admin/managers/' + this.updatingManager.id, this.updatingManager).then((response) => {
        this.$Message.success('修改成功')
      })
    },
    popLotAndBoy () {
      this.parkingBoys = this.parkingBoys.filter(item => {
        return !(this.parkingBoysIdArr.indexOf(item.id) > -1)
      })
      this.parkingLots = this.parkingLots.filter(item => {
        return !(this.parkingLotsIdArr.indexOf(item.id) > -1)
      })
    }
  },
  mounted () {
    this.axios.get('parking-boys').then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        response.data[i]['isEdit'] = false
      }
      this.employees = response.data
    })
    this.axios.get('/admin/managers/unmatchedParkingBoys').then((response) => {
      this.parkingBoys = response.data
    })
    this.axios.get('/admin/managers/unmatchedParkingLots').then((response) => {
      this.parkingLots = response.data
    })
  }
}

</script>

<style>
</style>
