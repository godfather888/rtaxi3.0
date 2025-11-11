import 'package:driver_flutter/config/locator/locator.dart';
import 'package:driver_flutter/core/datasources/upload_datasource.dart';
import 'package:driver_flutter/core/extensions/extensions.dart';
import 'package:driver_flutter/core/graphql/fragments/media.fragment.graphql.dart';
import 'package:driver_flutter/features/auth/presentation/blocs/login.bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_common/core/presentation/buttons/app_primary_button.dart';
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
                    child: Builder(
                      builder: (context) {
                        final requiredDocuments = state.requiredDocuments.where((doc) => doc.isRequired).toList();
                        final initialDocuments = <String, Fragment$Media>{
                          for (final media in state.profileFullEntity?.documents ?? <Fragment$Media>[])
                            if (media.driverDocumentId != null) media.driverDocumentId!: media,
                        };
                        return FormField<Map<String, Fragment$Media>>(
                          initialValue: Map<String, Fragment$Media>.from(initialDocuments),
                          validator: (value) {
                            if (requiredDocuments.isEmpty) {
                              return null;
                            }
                            final docs = value ?? <String, Fragment$Media>{};
                            final missing = requiredDocuments.where(
                              (doc) => !docs.containsKey(doc.id),
                            );
                            if (missing.isNotEmpty) {
                              return context.translate.pleaseUploadAllDocuments;
                            }
                            return null;
                          },
                          onSaved: (newValue) => locator<LoginBloc>().setDocuments(
                            newValue?.values.toList(growable: false) ?? const <Fragment$Media>[],
                          ),
                          builder: (fieldState) => Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              ...requiredDocuments.map(
                                (driverDocument) {
                                  final currentValue = fieldState.value?[driverDocument.id];
                                  return Padding(
                                    padding: const EdgeInsets.only(bottom: 16),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          driverDocument.title,
                                          style: context.titleMedium,
                                        ),
                                        const SizedBox(height: 8),
                                        UploadImageField(
                                          key: ValueKey('document_${driverDocument.id}'),
                                          initialValue: currentValue,
                                          shape: BoxShape.rectangle,
                                          borderRadius: 12,
                                          displayValue: (media) => media.address,
                                          uploadButtonText: context.translate.uploadImage,
                                          fileUploader: (file) => locator<UploadDatasource>().uploadDocument(
                                            file,
                                            documentId: driverDocument.id,
                                          ),
                                          onChanged: (newValue) {
                                            if (newValue != null) {
                                              final updated = Map<String, Fragment$Media>.from(fieldState.value ?? {});
                                              updated[driverDocument.id] = newValue;
                                              fieldState.didChange(updated);
                                            }
                                          },
                                        ),
                                      ],
                                    ),
                                  );
                                },
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
                        );
                      },
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
