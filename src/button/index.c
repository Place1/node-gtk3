#include <gtk/gtk.h>
#include <stdio.h>
#include "index.h"

typedef struct {
  char *name;
} Settings;
Settings settings = {"Some Button"};

GtkWidget *create(char* label) {
  GtkWidget *button;
  button = gtk_button_new_with_label(label);
  return button;
}

void attach(GtkWidget *button, GtkWidget *container) {
  gtk_container_add(GTK_CONTAINER(container), button);
}

void setSize(GtkWidget *button, gint width, gint height) {
  gtk_widget_set_size_request(button, width, height);
}
