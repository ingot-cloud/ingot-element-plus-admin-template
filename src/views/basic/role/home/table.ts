import type { TableHeaderRecord } from "@/components/table";
import { getRoleTypeText } from "@/models/enums/roleEnums";
import type { RoleType } from "@/models/enums/roleEnums";

export const tableHeaders: Array<TableHeaderRecord> = [
  {
    label: "序号",
    type: "index",
    align: "center",
    width: "50",
  },
  {
    label: "角色名",
    prop: "name",
  },
  {
    label: "角色编码",
    prop: "code",
  },
  {
    label: "角色类型",
    prop: "type",
    transform: (value: string) => getRoleTypeText(value as RoleType),
  },
  {
    label: "状态",
    prop: "status",
  },
  {
    label: "备注",
    prop: "remark",
    hide: true,
  },
  {
    label: "创建时间",
    prop: "createdAt",
  },
  {
    label: "操作",
    width: "320",
    prop: "actions",
    fixed: "right",
    align: "center",
  },
];
