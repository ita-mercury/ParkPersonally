<template>
  <div class="layout">
    <Layout>
      <header-view></header-view>
      <Layout>
        <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
          <Menu @on-select="selectItem" active-name="employee" theme="dark" width="auto">
            <MenuItem name="employee">
              <Icon type="ios-navigate"></Icon>
              <span>员工管理</span>
            </MenuItem>
            <MenuItem name="parkingLot">
              <Icon type="ios-search"></Icon>
              <span>停车场管理</span>
            </MenuItem>
            <MenuItem name="parkingBoy">
              <Icon type="ios-settings"></Icon>
              <span>停车员管理</span>
            </MenuItem>
            <MenuItem name="parkingLotDashboard">
              <Icon type="ios-settings"></Icon>
              <span>停车场 Dashboard</span>
            </MenuItem>
            <MenuItem name="parkingOrder">
              <Icon type="ios-settings"></Icon>
              <span>订单管理</span>
            </MenuItem>
          </Menu>
          <div slot="trigger"></div>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import HeaderView from '../components/Header'
export default {
  name: 'Home',
  components: {
    HeaderView: HeaderView
  },
  data () {
    return {
      isCollapsed: false
    }
  },
  methods: {
    selectItem (name) {
      this.$router.push({ name: name })
    }
  }
}
</script>

<style scoped>

</style>
