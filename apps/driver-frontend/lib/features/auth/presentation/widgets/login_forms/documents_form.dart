import 'package:driver_flutter/config/locator/locator.dart';
import 'package:driver_flutter/core/datasources/upload_datasource.dart';
import 'package:collection/collection.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:driver_flutter/core/graphql/fragments/media.fragment.graphql.dart';
import 'package:driver_flutter/features/auth/presentation/blocs/login.bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_common/core/presentation/buttons/app_primary_button.dart';
import 'package:flutter_common/core/presentation/snackbar/snackbar.dart';
import 'package:flutter_common/core/presentation/upload_image_field.dart';

class DocumentsForm extends StatelessWidget {
  final GlobalKey<FormState> formKey = GlobalKey();
  final LoginState state;

  DocumentsForm({
    super.key,
    required this.state,
  });

  @override
  Widget build(BuildContext context) {
    final loginBloc = locator<LoginBloc>();
    return Form(
      key: formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Expanded(
            child: SingleChildScrollView(
              child: Column(
                children: [
                  Text(
                    context.translate.profilePhotoDescription,
                    style: context.bodyMedium,
                  ),
                  const SizedBox(
                    height: 16,
                  ),
                  UploadImageField(
                    displayValue: (p0) => p0.address,
                    validator: (p0) => p0 == null ? context.translate.pleaseUploadProfilePhoto : null,
                    initialValue: state.profileFullEntity?.media,
                    onSaved: (value) => locator<LoginBloc>().onProfilePhotoChanged(value),
                    uploadButtonText: context.translate.uploadImage,
                    fileUploader: locator<UploadDatasource>().uploadProfilePicture,
                  ),
                  const SizedBox(
                    height: 28,
                  ),
                  Text(
                    context.translate.requiredDocuments,
                    style: context.titleLarge,
                  ),
                  const SizedBox(
                    height: 16,
                  ),
                  Text(
                    context.translate.documentsRequiredList,
                    style: context.bodyMedium,
                  ),
                  const SizedBox(
                    height: 16,
                  ),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: FormField<List<Fragment$Media>>(
                      initialValue: state.profileFullEntity?.documents!.toList() ?? [],
                      validator: (value) {
                        // Требуем минимум 2 документа (водительское удостоверение + техпаспорт)
                        if (value == null || value.length < 2) {
                          return context.translate.pleaseUploadAllDocuments;
                        }
                        return null;
                      },
                      onSaved: (newValue) => locator<LoginBloc>().setDocuments(newValue ?? []),
                      builder: (fieldState) => Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Wrap(
                            spacing: 16,
                            runSpacing: 16,
                            children: [
                              ...fieldState.value?.mapIndexed(
                                    (index, e) => UploadImageField(
                                      initialValue: e,
                                      shape: BoxShape.rectangle,
                                      displayValue: (media) => media.address,
                                      borderRadius: 12,
                                      onChanged: (newValue) {
                                        if (newValue != null) {
                                          fieldState.value![index] = newValue;
                                          fieldState.didChange(fieldState.value);
                                        }
                                      },
                                      uploadButtonText: context.translate.uploadImage,
                                      fileUploader: locator<UploadDatasource>().uploadDocument,
                                    ),
                                  ) ??
                                  [],
                              UploadImageField(
                                displayValue: (p0) => p0.address,
                                onChanged: (newValue) {
                                  if (newValue != null) {
                                    fieldState.didChange(fieldState.value?.followedBy([newValue]).toList());
                                  }
                                },
                                uploadButtonText: context.translate.uploadImage,
                                shape: BoxShape.rectangle,
                                borderRadius: 16,
                                fileUploader: locator<UploadDatasource>().uploadDocument,
                              )
                            ],
                          ),
                          if (fieldState.hasError) ...[
                            const SizedBox(height: 8),
                            Text(
                              fieldState.errorText!,
                              style: context.bodyMedium?.copyWith(color: context.theme.colorScheme.error),
                            ),
                          ],
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 32,
                  )
                ],
              ),
            ),
          ),
          AppPrimaryButton(
            onPressed: () {
              if (formKey.currentState?.validate() == true) {
                formKey.currentState?.save();
                loginBloc.onConfirmDocumentsPressed();
              }
            },
            child: Text(
              context.translate.confirm,
            ),
          ),
        ],
      ),
    );
  }
}
