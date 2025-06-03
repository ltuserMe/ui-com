<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="title"
    :width="width"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    destroy-on-close
    top="5vh"
    right
  >
    <template #title>
      <div style="width: 100%; display: flex; align-items: center">
        <div class="tilte-icon" :style="{ backgroundColor: bgColor }" />
        <div style="font-weight: bold">
          {{ title }}
        </div>
      </div>
    </template>
    <div class="p-[20px]">
      <slot name="header" />
      <el-form
        ref="formRef"
        class="mt-[30px] p-x[20px] dialog-form"
        :model="localForm"
        :rules="rules"
        label-width="auto"
      >
        <div
          v-for="(groupItem, groupIndex) in groupedFormItems"
          :key="groupIndex"
        >
          <template v-if="groupItem.type === 'label'">
            <span :class="['big-label', groupItem.content.class || '']">
              {{ groupItem.content.label }}
            </span>
          </template>
          <template v-else>
            <el-row>
              <el-col
                v-for="item in groupItem.content"
                :key="item.label"
                :span="type === 'col-1' ? 24 : 12"
              >
                <el-form-item
                  v-if="(item.isShow && item.isShow(localForm)) || true"
                  :label="item.label"
                  :prop="item.prop"
                  :required="item.required"
                >
                  <template v-if="item.type === 'input'">
                    <el-input
                      style="text-align: right"
                      v-model.trim="localForm[item.prop]"
                      :placeholder="item.placeholder"
                      v-bind="item.attr"
                    />
                  </template>

                  <template v-if="item.type === 'checkboxgroup'">
                    <el-checkbox-group
                      v-model="localForm[item.prop]"
                      :disabled="item.disabled"
                    >
                      <template
                        v-for="(checkboxItem, index) in item.checkboxes"
                      >
                        <el-checkbox
                          :key="index"
                          :value="checkboxItem.value"
                          :disabled="item.disabled"
                          @change="handleCheckboxChange(checkboxItem.value)"
                        >
                          {{ checkboxItem.label }}
                        </el-checkbox>
                      </template>
                    </el-checkbox-group>
                  </template>

                  <template v-if="item.type === 'check'">
                    <el-checkbox
                      v-model="localForm[item.prop]"
                      :disabled="item.disabled"
                    />
                  </template>

                  <template v-if="item.type === 'radio'">
                    <el-radio-group v-model="localForm[item.prop]">
                      <el-radio
                        v-for="(radioItem, index) in item.radioOptions"
                        :key="index"
                        :label="radioItem.value"
                      >
                        {{ radioItem.label }}
                      </el-radio>
                    </el-radio-group>
                  </template>

                  <template v-if="item.type === 'select'">
                    <el-select
                      v-model="localForm[item.prop]"
                      placeholder="请选择"
                      @change="item.change"
                    >
                      <el-option
                        v-for="option in item.options"
                        :key="option[item.valueKey || 'value']"
                        :value="option[item.valueKey || 'value']"
                        :label="option[item.labelKey || 'label']"
                      >
                        <span>{{ option[item.labelKey || "label"] }}</span>
                      </el-option>
                    </el-select>
                  </template>

                  <template v-if="item.type === 'cascader'">
                    <el-cascader
                      v-model="localForm[item.prop]"
                      style="width: 100%"
                      v-bind="item.attr"
                      :placeholder="item.placeholder || '请选择'"
                      :options="item.options"
                      :props="item.props"
                      @change="item.change"
                    />
                  </template>

                  <template v-if="item.type === 'image'">
                    <el-image
                      :src="localForm[item.prop]"
                      style="width: 100px; height: 100px"
                      :preview-src-list="[localForm[item.prop]]"
                    />
                  </template>

                  <template v-if="item.type === 'span'">
                    <div :class="item.class" v-bind="item.attr">
                      {{ localForm[item.prop] }}
                    </div>
                    <div
                      v-if="item.customizeModel"
                      :class="item.customizeModelClass"
                    >
                      {{ localForm[item.customizeModel] }}
                    </div>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
            <slot name="formItem" />
          </template>
        </div>
      </el-form>
    </div>
    <!--   -->
    <div
      v-if="showConfirm"
      slot="footer"
      lot-scope="footer"
      class="dialog-footer"
    >
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "ADialogForm",
  props: {
    title: {
      type: String,
      default: "新增",
    },
    width: {
      type: String,
      default: "800px",
    },
    form: {
      type: Object,
      default: () => ({}),
    },
    formItems: {
      type: Array,
      default: () => [],
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    showConfirm: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "col-1",
      validator: (value) => ["col-1", "col-2"].includes(value),
    },
    height: {
      type: String,
      default: "auto",
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
      localForm: {},
      // 移除了uploadFileLists相关代码
    };
  },
  computed: {
    groupedFormItems() {
      const result = [];
      let currentGroup = [];
      for (const item of this.formItems) {
        if (item.type === "label") {
          if (currentGroup.length > 0) {
            result.push({ type: "group", content: currentGroup });
            currentGroup = [];
          }
          result.push({ type: "label", content: item });
        } else {
          currentGroup.push(item);
          if (currentGroup.length === 2 && this.type === "col-2") {
            result.push({ type: "group", content: currentGroup });
            currentGroup = [];
          }
        }
      }
      if (currentGroup.length > 0) {
        result.push({ type: "group", content: currentGroup });
      }
      return result;
    },
    bgColor() {
      return this.$store.state.settings.theme || "#4770A4";
    },
  },
  watch: {
    form: {
      deep: true,
      handler(newVal) {
        this.localForm = { ...newVal };
        // 移除了文件列表初始化逻辑
      },
    },
  },
  mounted() {
    this.localForm = { ...this.form };
    console.log(this.localForm);

    this.dialogVisible = this.modelValue;
  },
  methods: {
    handleClose() {
      this.$emit("cancel");
      this.dialogVisible = false;
    },

    handleConfirm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.$emit("confirm", this.localForm);
          this.handleClose();
        }
      });
    },

    handleCheckboxChange(selectedValue) {
      this.localForm.qualification = selectedValue ? [selectedValue] : [];
    },
  },
};
</script>

<style scoped lang="scss">
.big-label {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 20px 0 15px 0;
  display: block;
}
.title-label {
  padding-left: 12px;
}
.dialog-form {
  max-height: v-bind(defaultHeight);
  overflow-y: auto;
}
.tilte-icon {
  width: 15px;
  height: 35px;
  margin-right: 10px;
}
::v-deep .el-dialog__header {
  padding: 5px 20px !important;
  border-bottom: 1px solid #e0e0e0;
}
::v-deep .el-dialog__headerbtn {
  top: 14.5px !important;
}
// .dialog-footer {
//   display: flex;
//   justify-content: flex-end;
// }
</style>
