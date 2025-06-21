import 'dart:convert';
import 'dart:io';

void main(List<String> arguments) async {
  if (arguments.length != 1) {
    print('Usage: dart remove_duplicate_keys.dart <input_arb_file>');
    return;
  }

  final inputFile = File(arguments[0]);
  if (!await inputFile.exists()) {
    print('Input file ${arguments[0]} does not exist.');
    return;
  }

  try {
    final jsonString = await File(arguments[0]).readAsString();
    final Map<String, dynamic> arbData = jsonDecode(jsonString);

    // Extract keys and remove duplicates
    final uniqueKeys = arbData.keys.toSet().toList();

    // Create a new map with only unique keys
    final Map<String, dynamic> filteredArbData = {};
    for (final key in uniqueKeys) {
      filteredArbData[key] = arbData[key];
    }

    // Write the filtered data to a new file
    final outputFile = File('${arguments[0]}.deduped.arb');
    await outputFile.writeAsString(jsonEncode(filteredArbData));

    print(
        'Successfully removed duplicate keys. Output file: ${outputFile.path}');
  } catch (e) {
    print('Error: $e');
  }
}
