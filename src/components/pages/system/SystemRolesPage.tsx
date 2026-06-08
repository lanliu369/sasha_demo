"use client";

import { Card } from "@arco-design/web-react";
import { useState } from "react";
import { LarkTag } from "@/components/demo/LarkTag";
import { CreateRoleModal } from "@/components/system/CreateRoleModal";
import { RolePermissionTags } from "@/components/system/RolePermissionTags";
import { roles as initialRoles } from "@/lib/mock/pages";
import type { RoleRecord } from "@/lib/types/demo";

export function SystemRolesPage() {
  const [roleList, setRoleList] = useState<RoleRecord[]>(initialRoles);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <CreateRoleModal
          existingRoles={roleList}
          onSubmit={(role) => setRoleList((prev) => [...prev, role])}
        />
      </div>

      {roleList.map((role) => (
        <Card key={role.id} title={role.name} bordered className="lark-card-elevated">
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div>
              <p className="text-text-secondary">菜单权限</p>
              <RolePermissionTags
                items={role.menuPermissions}
                kind="menu"
              />
            </div>
            <div>
              <p className="text-text-secondary">数据范围</p>
              <LarkTag variant="neutral" className="mt-1">
                {role.dataScope}
              </LarkTag>
            </div>
            <div>
              <p className="text-text-secondary">操作权限</p>
              <RolePermissionTags
                items={role.operatePermissions}
                variant="info"
                kind="operate"
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
