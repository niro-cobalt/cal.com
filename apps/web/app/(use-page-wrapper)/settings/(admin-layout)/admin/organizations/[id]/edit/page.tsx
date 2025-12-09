import { type Params } from "app/_types";
import { _generateMetadata, getTranslate } from "app/_utils";
import { z } from "zod";

import LicenseRequired from "@calcom/features/ee/common/components/LicenseRequired";
import { OrgForm } from "@calcom/features/ee/organizations/pages/settings/admin/AdminOrgEditPage";
import { getOrganizationRepository } from "@calcom/features/ee/organizations/di/OrganizationRepository.container";
import SettingsHeader from "@calcom/features/settings/appDir/SettingsHeader";

const orgIdSchema = z.object({ id: z.coerce.number() });

// Next.js 16: params is now a Promise that needs to be awaited
export const generateMetadata = async (props: { params: Promise<Params> }) => {
  const organizationRepository = getOrganizationRepository();
  const params = await props.params;
  const input = orgIdSchema.safeParse(params);
  if (!input.success) {
    return await _generateMetadata(
      (t) => t("editing_org"),
      (t) => t("admin_orgs_edit_description"),
      undefined,
      undefined,
      "/settings/admin/organizations/edit"
    );
  }

  const org = await organizationRepository.adminFindById({ id: input.data.id });

  return await _generateMetadata(
    (t) => `${t("editing_org")}: ${org.name}`,
    (t) => t("admin_orgs_edit_description"),
    undefined,
    undefined,
    `/settings/admin/organizations/${input.data.id}/edit`
  );
};

// Next.js 16: params is now a Promise that needs to be awaited
const Page = async (props: { params: Promise<Params> }) => {
  const organizationRepository = getOrganizationRepository();
  const params = await props.params;
  const input = orgIdSchema.safeParse(params);

  if (!input.success) throw new Error("Invalid access");

  const org = await organizationRepository.adminFindById({ id: input.data.id });
  const t = await getTranslate();
  return (
    <SettingsHeader title={`${t("editing_org")}: ${org.name}`} description={t("admin_orgs_edit_description"}>
      <LicenseRequired>
        <OrgForm org={org} />
      </LicenseRequired>
    </SettingsHeader>
  );
};

export default Page;
