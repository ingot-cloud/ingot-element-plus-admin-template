import { reactive, ref, unref } from "vue";
import type { Ref } from "vue";
import type { Router } from "vue-router";

const formModel = reactive({
  username: "",
  password: "",
});

const rules = ref({
  username: [{ required: true, message: "请输入登录名称", trigger: "blur" }],
  password: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
});

const loading = ref(false);

/**
 * 密码登录逻辑
 * @param formRef
 */
const handleLogin = (formRef: Ref, router: Router): void => {
  const form = unref(formRef);
  form.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      const params = router.currentRoute.value.query;
      router.replace({
        path: params.redirect ? String(params.redirect) : "/",
      });

      loading.value = false;
    }
  });
};

export default {
  loading,
  formModel,
  rules,
  handleLogin,
};
